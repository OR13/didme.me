// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { issueCredential } from "../../../vc-api";

type VerifiableCredential = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifiableCredential>
) {
  const { credential } = req.body;
  const { mnemonic } = req.headers;
  const format = req.headers["vc-format"];
  try {
    const verifiableCredential = await issueCredential({
      credential,
      mnemonic,
      format,
    });
    res.status(200).json(verifiableCredential);
  } catch (e) {
    res.status(500).json({ message: (e as any).message });
  }
}
