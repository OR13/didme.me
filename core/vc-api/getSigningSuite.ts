import { getKeysForMnemonic } from "../core/getKeysForMnemonic";
import { getSuite } from "./getSuite";

export const getSigningSuite = async ({ keyType, mnemonic, hdpath }: any) => {
  const keys = await getKeysForMnemonic(keyType, mnemonic, hdpath);
  const assertionKeys = keys.map((k: any) => {
    return k;
  });
  //   we are exploiting the known structure of did:key here...
  const suite = await getSuite(assertionKeys[0]);
  return suite;
};
