import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;
import { getSummary } from "../../../core/NFT";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = { items: await getSummary() };

  res.status(200).json(result);
}
