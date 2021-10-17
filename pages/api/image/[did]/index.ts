// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { getImageFromDid } from "../../../../core/getImageFromDid";

type Data = Buffer;

import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { did } = req.query;
  const imageUrl = await getImageFromDid(did as string);

  const response: any = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });
  const buffer = Buffer.from(response.data, "utf-8");
  res.status(200);
  res.setHeader("Content-Type", response.headers["content-type"]);
  res.send(buffer);
}
