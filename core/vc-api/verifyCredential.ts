import { verifiable } from "@transmute/vc.js";
import { getSuite } from "./getSuite";
import { documentLoader } from "../documentLoader";
export const verifyCredential = async ({
  verifiableCredential,
  format,
}: any) => {
  const suite = await getSuite();
  const result = await verifiable.credential.verify({
    credential: verifiableCredential,
    suite,
    documentLoader,
    format: [format],
  });
  return result;
};
