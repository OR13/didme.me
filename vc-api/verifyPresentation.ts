import { verifiable } from "@transmute/vc.js";
import { getSuite } from "./getSuite";
import { documentLoader } from "../core/documentLoader";
export const verifyPresentation = async ({
  verifiablePresentation,
  options,
  format,
}: any) => {
  const suite = await getSuite();
  const result = await verifiable.presentation.verify({
    presentation: verifiablePresentation,
    domain: options.domain,
    challenge: options.challenge,
    suite,
    documentLoader,
    format: [format],
  });
  return result;
};
