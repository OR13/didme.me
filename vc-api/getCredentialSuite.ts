import { getSigningSuite } from "./getSigningSuite";

export const getCredentialSuite = async ({
  credential,
  keyType,
  mnemonic,
  hdpath,
}: any) => {
  const issuer = credential.issuer.id || credential.issuer;
  const suite = await getSigningSuite({ keyType, mnemonic, hdpath });
  const correctedVm = issuer + "#" + suite.verificationMethod?.split("#").pop();
  suite.verificationMethod = correctedVm;
  (suite as any).key.controller = issuer;
  (suite as any).key.id = correctedVm;

  return suite;
};
