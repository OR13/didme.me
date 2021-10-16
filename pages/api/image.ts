// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

type Data = Buffer;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const filePath = path.join(
    serverRuntimeConfig.PROJECT_ROOT,
    "./public/background-2.png"
  );
  const imageBuffer = fs.readFileSync(filePath);

  res.status(200);
  res.setHeader("Content-Type", "image/png");
  res.send(imageBuffer);
}
