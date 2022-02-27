import * as bip39 from "bip39";
import * as hdkey from "hdkey";
import { generators } from "../core/generators";

export const getKeysForMnemonic = async (
  keyType: string,
  mnemonic: string,
  hdpath: string
) => {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = hdkey.fromMasterSeed(seed);
  const addrNode = root.derive(hdpath);
  const { keys } = await generators.didKey(keyType, addrNode._privateKey);
  return keys;
};
