import * as ed25519 from "@transmute/did-key-ed25519";
// import * as bls12381 from "@transmute/did-key-bls12381";
// import * as secp256k1 from "@transmute/did-key-secp256k1";
import crypto from "crypto";

export const generators = {
  ed25519: async (seed: Uint8Array) => {
    return ed25519.generate({
      secureRandom: () => {
        if (seed) {
          return seed;
        }
        const random = crypto.randomBytes(32);
        return random;
      },
    });
  },
};
