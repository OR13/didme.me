import { verifiable } from "@transmute/vc.js";
import { getCredentialSuite } from "./getCredentialSuite";
import { documentLoader } from "../documentLoader";
export const issueCredential = async ({
  credential,
  mnemonic,
  keyType,
  hdpath,
}: any) => {
  const suite = await getCredentialSuite({
    credential,
    keyType,
    mnemonic,
    hdpath,
  });

  const { items } = await verifiable.credential.create({
    credential,
    suite,
    documentLoader,
    format: ["vc-jwt"],
  });
  return items[0];
};
