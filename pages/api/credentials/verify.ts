// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { verifyCredential } from "../../../vc-api";

type VerifiableCredential = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifiableCredential>
) {
  const { verifiableCredential } = req.body;
  const format = req.headers["vc-format"];
  try {
    const result = await verifyCredential({
      verifiableCredential,
      format,
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: (e as any).message });
  }
}
