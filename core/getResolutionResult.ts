import { resolve } from "./resolve";
import { resolveWithBitcoin } from "./resolveWithBitcoin";
import { resolutionWithEthereum } from "./resolutionWithEthereum";

import { resolutionWithNFTHistory } from "./resolutionWithNFTHistory";

const withPostResolutionAnnoutations = async (resolution: any) => {
  return resolveWithBitcoin(
    await resolutionWithEthereum(await resolutionWithNFTHistory(resolution))
  );
};

export const getResolutionResult = async (did: string) => {
  const { didDocument, didDocumentMetadata } = await resolve(did);

  const didUrlComponents = did.split(":");
  const resolutionResult = {
    didDocument,
    didResolutionMetadata: {
      didUrl: {
        did: did.split("#")[0],
        methodName: didUrlComponents[1],
        methodSpecificId: didUrlComponents[2],
      },
    },
    didDocumentMetadata,
  };
  return withPostResolutionAnnoutations(resolutionResult);
};
