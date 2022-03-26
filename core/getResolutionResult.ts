import { resolve } from "./resolve";
import * as didWeb from "../core/didWebConverter";
import { resolutionWithEthereum } from "./resolutionWithEthereum";
export const getResolutionResult = async (did: string) => {
  let { didDocument, didDocumentMetadata } = await resolve(did);

  if (did.startsWith("did:web")) {
    const didMeme = didWeb.didMeme(did);
    ({ didDocumentMetadata } = await resolve(didMeme));
    didDocument = {
      "@context": didDocument["@context"],
      id: didDocument.id,
      alsoKnownAs: [didMeme],
      ...didDocument,
    };
  }
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
