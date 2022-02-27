import * as didKey from "@transmute/did-key.js";
import { resolve } from "./resolve";
export const resolvers = {
  key: async (did: string) => {
    return didKey.resolve(did, { accept: "application/did+json" });
  },
  meme: async (did: string) => {
    const { didDocument } = await resolve(did);
    return didDocument;
  },
};
