import { resolve } from "./resolve";
import { resolutionWithEthereum } from "./resolutionWithEthereum";
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
  return resolutionWithEthereum(resolutionResult);
};
