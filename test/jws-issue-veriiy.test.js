const { documentLoader } = require("./documentLoader");

const vcjs = require("@transmute/vc.js");

const {
  JsonWebKey,
  JsonWebSignature,
} = require("@transmute/json-web-signature-2020");

const keyfile = require("./did-meme_ed25519_keyfile.json");
const c1 = require("./did-meme_ed25519_credential.json");

let verifiableCredential;

it("issue", async () => {
  const suite = new JsonWebSignature({
    key: await JsonWebKey.from(keyfile.keys.ed25519),
    date: "2019-12-11T03:50:55Z",
  });
  delete c1.proof;
  verifiableCredential = await vcjs.ld.issue({
    credential: c1,
    suite,
    documentLoader,
  });
  expect(verifiableCredential.proof.type).toBe("JsonWebSignature2020");
  console.log(verifiableCredential);
});
