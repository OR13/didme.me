import * as ed25519 from "@transmute/did-key-ed25519";
import * as bls12381 from "@transmute/did-key-bls12381";
import * as secp256k1 from "@transmute/did-key-secp256k1";
import crypto from "crypto";

import { resolvers } from "./resolvers";
const generators = {
  ed25519: async () => {
    const k0 = await ed25519.Ed25519KeyPair.generate({
      secureRandom: () => {
        const random = crypto.randomBytes(32);
        return random;
      },
    });
    const k1 = k0.toX25519KeyPair(true);
    const { didDocument } = await resolvers.ed25519(k0.controller);
    return {
      keys: {
        ed25519: k0.toJsonWebKeyPair(true),
        x25519: k1.toJsonWebKeyPair(true),
      },
      didDocument,
    };
  },
  bls12381: async () => {
    const k0 = await bls12381.Bls12381KeyPairs.generate();
    const k1 = k0.export(true);
    const { didDocument } = await resolvers.bls12381(k0.controller);
    return {
      keys: {
        bls12381_g1: k1.g1,
        bls12381_g2: k1.g2,
      },
      didDocument,
    };
  },
  secp256k1: async () => {
    const k0 = await secp256k1.Secp256k1KeyPair.generate({
      secureRandom: () => {
        const random = crypto.randomBytes(32);
        return random;
      },
    });
    const k1 = k0.toJsonWebKeyPair(true);
    const { didDocument } = await resolvers.secp256k1(k0.controller);
    return {
      keys: {
        secp256k1: k1,
      },
      didDocument,
    };
  },
};

export const generateKey = async (keyType) => {
  return generators[keyType]();
};
