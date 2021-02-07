const { documentLoader } = require("./documentLoader");

const vcjs = require("@transmute/vc.js");

const { Bls12381G2KeyPair } = require("@transmute/did-key-bls12381");
const {
  BbsBlsSignature2020,
  BbsBlsSignatureProof2020,
  deriveProof,
} = require("@mattrglobal/jsonld-signatures-bbs");

const keyfile = require("./did-meme_bls12381_keyfile.json");
const c1 = require("./did-meme_bls12381_credential.json");

let verifiableCredential;
let derivedProofCredential;

it("issue", async () => {
  const keypair = keyfile.keys.bls12381_g2;
  keypair.id = keypair.controller + keypair.id;
  const suite = new BbsBlsSignature2020({
    key: await Bls12381G2KeyPair.from(keypair),
    date: "2019-12-11T03:50:55Z",
  });
  delete c1.proof;
  verifiableCredential = await vcjs.ld.issue({
    credential: c1,
    suite,
    documentLoader,
  });
  // console.log(JSON.stringify(verifiableCredential, null, 2));
  expect(verifiableCredential.proof.type).toBe("BbsBlsSignature2020");
});

it("derive", async () => {
  const deriveProofFrame = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://w3id.org/security/bbs/v1",
      {
        image: "https://schema.org/image",
        name: "https://schema.org/name",
        birthDate: "https://schema.org/birthDate",
      },
    ],
    type: ["VerifiableCredential"],
    credentialSubject: {
      "@explicit": true,
      id: {},
      birthDate: {},
    },
  };
  derivedProofCredential = await deriveProof(
    verifiableCredential,
    deriveProofFrame,
    {
      suite: new BbsBlsSignatureProof2020(),
      documentLoader,
    }
  );
  expect(derivedProofCredential.proof.type).toBe("BbsBlsSignatureProof2020");
});

it("verify derived proof", async () => {
  const credentialVerified = await vcjs.ld.verifyCredential({
    credential: { ...derivedProofCredential },
    suite: new BbsBlsSignatureProof2020(),
    documentLoader,
  });
  expect(credentialVerified.verified).toBe(true);
});
