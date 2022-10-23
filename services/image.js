import { RawFile, StegImage, utils } from 'steg';

import { scrypt } from '@noble/hashes/scrypt';
const { DID, JWK } = require('@transmute/did-jwk-pqc');

const stegHardness = 5;

const scryptConfig = {
  N: 2 ** 19,
  r: 8,
  p: 1
};

const encode = async (
  querySelector,
  securePassword,
  secureSalt,
  alg = 'CRYDI5'
) => {
  const passwordBasedKey = scrypt(securePassword, secureSalt, scryptConfig);
  const key = await JWK.generateKeyPair(alg);
  const did = DID.toDid(key.publicKeyJwk);
  const file = new RawFile(
    utils.utf8ToBytes(did.replace('did:jwk:', '')),
    'did:jwk'
  );
  const el = document.querySelector(querySelector);
  const png = new StegImage(el);
  const hiddenPngUrl = await png.hide(file, passwordBasedKey, stegHardness);
  const didDocument = await DID.operations.resolve(did);
  return {
    did,
    image: hiddenPngUrl,
    didDocument,
    privateKeyJwk: key.privateKeyJwk
  };
};

const decode = async (querySelector, securePassword, secureSalt) => {
  const passwordBasedKey = scrypt(securePassword, secureSalt, scryptConfig);
  const el = document.querySelector(querySelector);
  const png = new StegImage(el);
  const revealed = await png.reveal(passwordBasedKey);
  const did = revealed.name + ':' + utils.bytesToUtf8(revealed.data);
  const { publicKeyJwk } = await DID.operations.dereference(did + '#0');
  const emojid = await DID.getEmojid(publicKeyJwk);
  const dataUrl = png.canvas.toDataURL();
  return { emojid, did, publicKeyJwk, dataUrl };
};

const image = { encode, decode };

export default image;
