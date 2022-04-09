import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

import { getHistory } from "../../../../core/NFT";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { did }: any = req.query;
  const history = await getHistory(did);
  res.status(200).json({ did, ...history });
}
