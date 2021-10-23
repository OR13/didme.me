import * as ed25519 from "@transmute/did-key-ed25519";
// import * as bls12381 from "@transmute/did-key-bls12381";
// import * as secp256k1 from "@transmute/did-key-secp256k1";
import { resolve } from "./resolve";
export const resolvers = {
  ed25519: async (did: string) => {
    return ed25519.resolve(did, { accept: "application/did+json" });
  },
  meme: async (did: string) => {
    const { didDocument } = await resolve(did);
    return didDocument;
  },
};
