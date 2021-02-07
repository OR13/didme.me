import { resolve } from "../../core";

const vcjs = require("@transmute/vc.js");

const { JsonWebSignature } = require("@transmute/json-web-signature-2020");
const {
  // Bls12381G2KeyPair,
  BbsBlsSignature2020,
  // BbsBlsSignatureProof2020,
  // deriveProof,
} = require("@mattrglobal/jsonld-signatures-bbs");

const contexts = {
  "https://www.w3.org/ns/did/v1": require("../../contexts/did-v1.json"),
  "https://www.w3.org/2018/credentials/v1": require("../../contexts/cred-v1.json"),
  "https://w3id.org/security/jws/v1": require("../../contexts/jws-v1.json"),
  "https://w3id.org/security/v2": require("../../contexts/sec-v2.json"),
  "https://w3id.org/security/v1": require("../../contexts/sec-v1.json"),
  "https://w3c-ccg.github.io/ldp-bbs2020/context/v1": require("../../contexts/bbs-v1.json"),
  "https://w3id.org/security/bbs/v1": require("../../contexts/bbs-v1.json"),
};

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

  const verification = await vcjs.ld.verifyCredential({
    credential,
    suite,
    documentLoader,
  });
  console.log(verification);

  return verification;
};
