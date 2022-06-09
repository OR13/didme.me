import type { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";
import { getResolutionResult } from "../../../../core/getResolutionResult";

type Data = any;

import { issueCredential } from "../../../../core/vc-api";

const getCredential = async (subjectDid: string) => {
  const { didDocument, didDocumentMetadata } = await getResolutionResult(
    subjectDid
  );

  const { image, ethereum, bitcoin, nft } = didDocumentMetadata;

  const credential = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      { "@vocab": "http://schema.org/" },
    ],
    type: ["VerifiableCredential"],
    issuer: "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn",
    issuanceDate: moment().toISOString(),
    id: `https://didme.me/api/nft/${subjectDid}`,
    name: `https://didme.me/${subjectDid}`,
    image: image,
    description: `Decentralized Identifier powered by IPFS and Steganography`,
    // attributes: [],
    credentialSubject: {
      id: subjectDid,
      didDocument,
      history: nft.history.items,
      ethereum,
      bitcoin,
    },
  };

  delete credential.credentialSubject.didDocument["@context"];

  const vc = await issueCredential({
    credential,
    mnemonic:
      "sell antenna drama rule twenty cement mad deliver you push derive hybrid",
    keyType: "ed25519",
    hdpath: `m/44'/0'/0'/0/0`,
    format: "vc",
  });
  return vc;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { did }: any = req.query;
  const credential = await getCredential(did as string);
  res.status(200).json(credential);
}
