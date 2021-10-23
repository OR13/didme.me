import { verifiable } from "@transmute/vc.js";
import { getPresentationSuite } from "./getPresentationSuite";
import { documentLoader } from "../core/documentLoader";
export const provePresentation = async ({
  presentation,
  options,
  mnemonic,
  format,
}: any) => {
  const suite = await getPresentationSuite({ presentation, mnemonic });
  const result = await verifiable.presentation.create({
    presentation,
    domain: options.domain,
    challenge: options.challenge,
    suite,
    documentLoader,
    format: [format],
  });
  return result.items[0];
};
