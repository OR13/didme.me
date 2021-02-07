import { resolve } from "../../core";
import { contexts } from "../../contexts";
const vcjs = require("@transmute/vc.js");

const { JsonWebSignature } = require("@transmute/json-web-signature-2020");
const {
  BbsBlsSignature2020,
  BbsBlsSignatureProof2020,
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

  console.error(iri);
  throw new Error("unsupported iri" + iri);
};

export const verifyCredential = async (credential) => {
  let suite;

  if (credential.proof.type === "JsonWebSignature2020") {
    suite = new JsonWebSignature();
  }

  if (credential.proof.type === "BbsBlsSignature2020") {
    suite = new BbsBlsSignature2020();
  }

  if (credential.proof.type === "BbsBlsSignatureProof2020") {
    suite = new BbsBlsSignatureProof2020();
  }

  const verification = await vcjs.ld.verifyCredential({
    credential,
    suite,
    documentLoader,
  });
  console.log(verification);

  return verification;
};
