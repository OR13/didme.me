import { resolve } from "./resolve";

export const getImageFromDid = async (did: string) => {
  const { didDocumentMetadata } = await resolve(did);
  const { image } = didDocumentMetadata;
  return image;
};
