import { resolve } from "../core/resolve";
import { getSigningSuite } from "./getSigningSuite";

export const getCredentialSuite = async ({
  credential,
  keyType,
  mnemonic,
  hdpath,
}: any) => {
  const issuer = credential.issuer.id || credential.issuer;
  const { didDocument } = await resolve(issuer);
  const suite = await getSigningSuite({ keyType, mnemonic, hdpath });
  if (didDocument.verificationMethod[0].id !== suite.key?.controller) {
    throw new Error("mnemonic is not for issuer");
  }
  return suite;
};
