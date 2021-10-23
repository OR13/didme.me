// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { provePresentation } from "../../../vc-api";

type VerifiablePresentation = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifiablePresentation>
) {
  const { presentation, options } = req.body;
  const { mnemonic } = req.headers;
  const format = req.headers["vp-format"];
  try {
    const verifiablePresentation = await provePresentation({
      presentation,
      options,
      mnemonic,
      format,
    });
    console.log("here....", verifiablePresentation);
    res.status(200).json(verifiablePresentation);
  } catch (e) {
    res.status(500).json({ message: (e as any).message });
  }
}
