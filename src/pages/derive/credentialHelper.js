import { resolve } from "../../core";
import { contexts } from "../../contexts";

const {
  BbsBlsSignatureProof2020,
  deriveProof,
} = require("@mattrglobal/jsonld-signatures-bbs");

const documentLoader = async (iri) => {
  if (contexts[iri]) {
    return {
      documentUrl: iri,
      document: contexts[iri],
    };
  }

  if (iri.startsWith("did:meme:")) {
    const { didDocument } = await resolve(iri);
    return {
      documentUrl: iri,
      document: didDocument,
    };
  }

  console.error("unsupported iri " + iri);

  throw new Error("unsupported iri " + iri);
};

export const deriveProofFromFrame = async (
  verifiableCredential,
  deriveProofFrame
) => {
  const derivedProofCredential = await deriveProof(
    verifiableCredential,
    deriveProofFrame,
    {
      suite: new BbsBlsSignatureProof2020(),
      documentLoader,
    }
  );

  return derivedProofCredential;
};
