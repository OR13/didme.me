import bitcore from "bitcore-lib";
import * as bip39 from "bip39";
import * as hdkey from "hdkey";
import bs58 from "bs58";

import { generators } from "../generators";

const nets: any = {
  network: bitcore.Networks.testnet,
};
export const getPrivateKey = async (
  mnemonic: string,
  hdpath: string,
  keyType: string,
  network = bitcore.Networks.testnet
) => {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = hdkey.fromMasterSeed(seed);
  const addrNode = root.derive(hdpath);
  const { keys } = await generators.didKey(keyType, addrNode._privateKey);
  const privateKey = new bitcore.PrivateKey(
    bs58.decode(keys[0].privateKeyBase58).toString("hex"),
    network
  );
  return privateKey;
};

export const getAddressFromKey = async (
  key: any,
  network = bitcore.Networks.testnet
) => {
  const publicKey = new bitcore.PublicKey(bs58.decode(key.publicKeyBase58));
  const address = new bitcore.Address(publicKey, network);
  return address.toString();
};

export const getAddress = async (
  mnemonic: string,
  hdpath: string,
  keyType: string,
  network = bitcore.Networks.testnet
) => {
  const privateKey = await getPrivateKey(mnemonic, hdpath, keyType, network);
  return privateKey.toAddress().toString();
};
