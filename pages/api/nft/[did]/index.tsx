import type { NextApiRequest, NextApiResponse } from "next";

import { getResolutionResult } from "../../../../core/getResolutionResult";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { did }: any = req.query;
  const result: Data = await getResolutionResult(did as string);
  const nftJson = {
    id: did,
    name: did,
    image: result.didDocumentMetadata.image,
    description: `Decentralized Identifier powered by IPFS and Steganography`,
    attributes: [],
    ...result,
  };
  res.status(200).json(nftJson);
}
