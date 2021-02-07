const contexts = {
  "https://www.w3.org/ns/did/v1": require("../src/contexts/did-v1.json"),
  "https://www.w3.org/2018/credentials/v1": require("../src/contexts/cred-v1.json"),
  "https://w3id.org/security/jws/v1": require("../src/contexts/jws-v1.json"),
  "https://w3id.org/security/bbs/v1": require("../src/contexts/bbs-v1.json"),
  "https://w3id.org/security/v3-unstable": require("../src/contexts/sec-v3.json"),
  "https://w3id.org/security/v2": require("../src/contexts/sec-v2.json"),
  "https://w3id.org/security/v1": require("../src/contexts/sec-v1.json"),
};

const documentLoader = (iri) => {
  if (contexts[iri]) {
    return {
      documentUrl: iri,
      document: contexts[iri],
    };
  }
  if (
    iri.startsWith(
      "did:meme:1zgs904tmqmvc77g7plraxgrulg5xhyexywe054hljtgd75vxvjyscwsmr2d60"
    )
  ) {
    return {
      documentUrl: iri,
      document: require("./didDocument.json"),
    };
  }
  console.error("Unsupported iri " + iri);
  throw new Error("Unsupported iri");
};

module.exports = { documentLoader };
