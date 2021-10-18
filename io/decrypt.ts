import { generators } from "../core/generators";
import * as bip39 from "bip39";
import * as hdkey from "hdkey";
export const DIDMEME_BIP44_COIN_TYPE = "42";

import { X25519KeyPair } from "@transmute/x25519-key-pair";

import { JWE } from "@transmute/jose-ld";

import base64url from "base64url";

import pako from "pako";

const expand = (message: string) => {
  const expanded = pako.inflate(Buffer.from(message, "base64"));
  return JSON.parse(Buffer.from(expanded).toString());
};

export const getRecipient = (message: string) => {
  const expandedMessage = expand(message);
  return {
    id: expandedMessage.recipients[0].header.kid,
    controller: expandedMessage.recipients[0].header.kid.split("#")[0],
  };
};

export const decryptWith = async (message: string, mnemonic: string) => {
  const cipher = new JWE.Cipher(X25519KeyPair);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = hdkey.fromMasterSeed(seed);
  const hdPath = `m/44'/${DIDMEME_BIP44_COIN_TYPE}'/0'/0/0`;
  const addrNode = root.derive(hdPath);

  const { keys } = await generators.ed25519(addrNode._privateKey);
  const keyAgreementKey = keys[1];

  const expandedMessage = expand(message);

  keyAgreementKey.id = expandedMessage.recipients[0].header.kid;
  keyAgreementKey.controller = keyAgreementKey.id.split("#")[0];

  const plaintext = await cipher.decrypt({
    jwe: expandedMessage,
    keyAgreementKey: await X25519KeyPair.from(keyAgreementKey),
  });

  return JSON.parse(Buffer.from(plaintext).toString("utf-8"));
};
