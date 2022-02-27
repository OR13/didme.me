import * as didKey from "@transmute/did-key.js";
import bs58 from "bs58";
import publicKeyToAddress from "ethereum-public-key-to-address";

export const resolutionWithEthereum = async (resolution: any) => {
  const vm = resolution.didDocument.verificationMethod[0];
  if (vm.publicKeyJwk.crv === "secp256k1") {
    const id = vm.id.split("#").pop();
    const did = `did:key:${id}`;
    const { didDocument } = await didKey.resolve(did, {
      accept: "application/did+ld+json",
    });
    const publicKey = bs58.decode(
      didDocument.verificationMethod[0].publicKeyBase58
    );
    const address = publicKeyToAddress(Buffer.from(publicKey));
    resolution.didDocumentMetadata.ethereum = {
      address,
    };
  }
  return resolution;
};
