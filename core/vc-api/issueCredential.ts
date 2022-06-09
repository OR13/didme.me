import { verifiable } from "@transmute/vc.js";
import { getCredentialSuite } from "./getCredentialSuite";
import { documentLoader } from "../documentLoader";
export const issueCredential = async ({
  credential,
  mnemonic,
  keyType,
  hdpath,
  format,
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
    format: [format || "vc-jwt"],
  });
  return items[0];
};
