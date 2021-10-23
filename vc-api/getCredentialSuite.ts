import { resolve } from "../core/resolve";
import { getKeysForMnemonic } from "../core/getKeysForMnemonic";
import { getSuite } from "./getSuite";

export const getCredentialSuite = async ({ credential, mnemonic }: any) => {
  const issuer = credential.issuer.id || credential.issuer;
  const { didDocument } = await resolve(issuer);
  const keys = await getKeysForMnemonic(mnemonic);
  const assertionKeys = keys.map((k) => {
    if (k.controller !== issuer) {
      k.id = k.id.replace(k.controller, issuer);
      k.controller = issuer;
    }
    return k;
  });
  if (didDocument.verificationMethod[0].id !== assertionKeys[0].id) {
    throw new Error("mnemonic is not for issuer");
  }
  //   we are exploiting the known structure of did:key here...
  const suite = await getSuite(assertionKeys[0]);
  return suite;
};
