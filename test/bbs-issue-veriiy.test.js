const { documentLoader } = require("./documentLoader");

const vcjs = require("@transmute/vc.js");

const { Bls12381G2KeyPair } = require("@transmute/did-key-bls12381");
const {
  // Bls12381G2KeyPair,
  BbsBlsSignature2020,
  // BbsBlsSignatureProof2020,
  // deriveProof,
} = require("@mattrglobal/jsonld-signatures-bbs");

const keyfile = require("./did-meme_bls12381_keyfile.json");
const c1 = require("./did-meme_bls12381_credential.json");

let verifiableCredential;

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
