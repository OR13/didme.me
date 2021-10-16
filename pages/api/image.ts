// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = Buffer;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //   const templateDirectory = path.resolve(process.cwd(), "templates");
  //   const filePath = path.join(templateDirectory, "background-2.png");

  const filePath = path.join(process.cwd(), `/public/images/background-2.png`);
  const imageBuffer = fs.readFileSync(filePath);

  res.status(200);
  res.setHeader("Content-Type", "image/png");
  res.send(imageBuffer);
}
