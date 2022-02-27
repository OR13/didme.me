import crypto from "crypto";
import * as didKey from "@transmute/did-key.js";

export const generators = {
  didKey: async (type: string, seed: Uint8Array) => {
    return (didKey as any)[type].generate(
      {
        secureRandom: () => {
          if (seed) {
            return seed;
          }
          const random = crypto.randomBytes(32);
          return random;
        },
      },
      {
        accept: "application/did+ld+json",
      }
    );
  },
};
