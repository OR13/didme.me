import * as bip39 from "bip39";
import * as hdkey from "hdkey";
import { generators } from "../core/generators";
export const DIDMEME_BIP44_COIN_TYPE = "42";
export const getKeysForMnemonic = async (mnemonic: string) => {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = hdkey.fromMasterSeed(seed);
  const hdPath = `m/44'/${DIDMEME_BIP44_COIN_TYPE}'/0'/0/0`;
  const addrNode = root.derive(hdPath);
  const { keys } = await generators.ed25519(addrNode._privateKey);
  return keys;
};
