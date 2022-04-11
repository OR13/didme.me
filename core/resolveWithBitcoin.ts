import * as didKey from "@transmute/did-key.js";
import { getAddressFromKey } from "./Bitcoin";

export const resolveWithBitcoin = async (resolution: any) => {
  const vm = resolution.didDocument.verificationMethod[0];
  if (vm.publicKeyJwk.crv === "secp256k1") {
    const id = vm.id.split("#").pop();
    const did = `did:key:${id}`;
    const { didDocument } = await didKey.resolve(did, {
      accept: "application/did+ld+json",
    });
    const address = await getAddressFromKey(didDocument.verificationMethod[0]);
    resolution.didDocumentMetadata.bitcoin = {
      address,
    };
  }
  return resolution;
};
