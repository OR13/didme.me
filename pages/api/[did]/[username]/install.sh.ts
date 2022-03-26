// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = Buffer;

import * as didWeb from "../../../../core/didWebConverter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { did, username }: any = req.query;

  const id = did.split(":").pop();

  const newDid = didWeb.didWeb(did, username);

  const installScript = `
echo
echo "1. say buh bye to 🔥 ${did}"
echo
echo "2. say wassup to  🌴 ${newDid}"
echo
echo "gh repo create ${did
    .split(":")
    .pop()} --template https://github.com/OR13/didme.me --public"
echo "gh repo clone https://github.com/${username}/${id}"
echo "cd ${id}"
echo "curl -s https://didme.me/api/${did} > parent.json"
echo "curl -s https://didme.me/api/image/${did} > parent.png"
echo "cat parent.json | jq '.didDocument' > did.json"
echo "sed 's/${did}/${newDid}/g' did.json > ./docs/did.json"
echo "cat ./docs/did.json | jq '.id' > README.md"
echo "git add ./README.md ./docs/did.json ./parent.json ./parent.png"
echo "git commit -m ':rocket:'"
echo "git push origin main"
  `;
  const buffer = Buffer.from(installScript, "utf-8");
  res.status(200);
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.send(buffer);
}
