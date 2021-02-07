import { Bls12381G2KeyPair } from "@transmute/did-key-bls12381";
const vcjs = require("@transmute/vc.js");

const {
  JsonWebKey,
  JsonWebSignature,
} = require("@transmute/json-web-signature-2020");

const {
  // Bls12381G2KeyPair,
  BbsBlsSignature2020,
  // BbsBlsSignatureProof2020,
  // deriveProof,
} = require("@mattrglobal/jsonld-signatures-bbs");

const contexts = {
  "https://www.w3.org/2018/credentials/v1": require("../../contexts/cred-v1.json"),
  "https://w3id.org/security/jws/v1": require("../../contexts/jws-v1.json"),
  "https://w3id.org/security/v2": require("../../contexts/sec-v2.json"),
  "https://w3id.org/security/v1": require("../../contexts/sec-v1.json"),
  "https://w3c-ccg.github.io/ldp-bbs2020/context/v1": require("../../contexts/bbs-v1.json"),
  "https://w3id.org/security/bbs/v1": require("../../contexts/bbs-v1.json"),
};

const documentLoader = (iri) => {
  if (contexts[iri]) {
    return {
      documentUrl: iri,
      document: contexts[iri],
    };
  }
  console.log(iri);

  throw new Error("unsupported iri" + iri);
};

export const issueVc = async (keyFile, credential) => {
  let suite;
  let keypair;

  if (keyFile.keys.ed25519) {
    keypair = keyFile.keys.ed25519;
    keypair.id = keypair.controller + keypair.id;
    suite = new JsonWebSignature({
      key: await JsonWebKey.from(keypair),
    });
  }

  if (keyFile.keys.secp256k1) {
    keypair = keyFile.keys.secp256k1;
    keypair.id = keypair.controller + keypair.id;
    suite = new JsonWebSignature({
      key: await JsonWebKey.from(keypair),
    });
  }

  if (keyFile.keys.bls12381_g2) {
    keypair = keyFile.keys.bls12381_g2;
    keypair.id = keypair.controller + keypair.id;
    suite = new BbsBlsSignature2020({
      key: await Bls12381G2KeyPair.from(keypair),
    });
  }

  const verifiableCredential = await vcjs.ld.issue({
    credential,
    suite,
    documentLoader,
  });

  return verifiableCredential;
};
