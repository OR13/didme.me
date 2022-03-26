// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = Buffer;

import * as didWeb from "../../../../core/didWebConverter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { did, username }: any = req.query;

  const newDid = didWeb.didWeb(did, username);

  const installScript = `
echo
echo "1. say buh bye to 🔥 ${did}"
echo
echo "2. say wassup to  🌴 ${newDid}"
echo
echo "gh repo create ${newDid} --template https://github.com/OR13/didme.me"
echo
  `;
  const buffer = Buffer.from(installScript, "utf-8");
  res.status(200);
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.send(buffer);
}
