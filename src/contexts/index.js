const contexts = {
  "https://www.w3.org/ns/did/v1": require("./did-v1.json"),
  "https://www.w3.org/2018/credentials/v1": require("./cred-v1.json"),
  "https://w3id.org/security/jws/v1": require("./jws-v1.json"),
  "https://w3id.org/security/v3-unstable": require("./sec-v3.json"),
  "https://w3id.org/security/v2": require("./sec-v2.json"),
  "https://w3id.org/security/v1": require("./sec-v1.json"),
  "https://w3c-ccg.github.io/ldp-bbs2020/context/v1": require("./bbs-v1.json"),
  "https://w3id.org/security/bbs/v1": require("./bbs-v1.json"),
};

export { contexts };
