import * as ed25519 from "@transmute/did-key-ed25519";
import * as bls12381 from "@transmute/did-key-bls12381";
import * as secp256k1 from "@transmute/did-key-secp256k1";

export const resolvers = {
  ed25519: async (did) => {
    return ed25519.driver.resolve(did, { accept: "application/did+json" });
  },
  bls12381: async (did) => {
    return bls12381.driver.resolve(did, { accept: "application/did+json" });
  },
  secp256k1: async (did) => {
    return secp256k1.driver.resolve(did, { accept: "application/did+json" });
  },
};
