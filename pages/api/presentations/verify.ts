// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { verifyPresentation } from "../../../vc-api";

type VerificationResult = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerificationResult>
) {
  const { verifiablePresentation, options } = req.body;
  const format = req.headers["vp-format"];
  try {
    const result = await verifyPresentation({
      verifiablePresentation,
      options,
      format,
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: (e as any).message });
  }
}
