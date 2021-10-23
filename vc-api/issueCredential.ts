import { verifiable } from "@transmute/vc.js";
import { getCredentialSuite } from "./getCredentialSuite";
import { documentLoader } from "../core/documentLoader";
export const issueCredential = async ({
  credential,
  mnemonic,
  format,
}: any) => {
  const suite = await getCredentialSuite({ credential, mnemonic });
  const { items } = await verifiable.credential.create({
    credential,
    suite,
    documentLoader,
    format: [format],
  });
  return items[0];
};
