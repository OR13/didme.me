import { X25519KeyPair } from "@transmute/x25519-key-pair";

import { JWE } from "@transmute/jose-ld";

import base64url from "base64url";

import pako from "pako";

const compact = (jwe: any) => {
  return base64url.encode(pako.deflate(Buffer.from(JSON.stringify(jwe))));
};

export const encryptTo = async (didDocument: any, document: any) => {
  const keyAgreementKey = didDocument.verificationMethod[1];
  const cipher = new JWE.Cipher(X25519KeyPair);
  const recipients = [
    {
      header: {
        kid: keyAgreementKey.id,
        alg: "ECDH-ES+A256KW",
      },
    },
  ];
  const jwe = await cipher.encryptObject({
    obj: document,
    recipients,
    publicKeyResolver: async (id: string) => {
      if (id === keyAgreementKey.id) {
        return keyAgreementKey;
      }
      throw new Error(
        "publicKeyResolver does not suppport IRI " + JSON.stringify(id)
      );
    },
  });
  return compact(jwe);
};
