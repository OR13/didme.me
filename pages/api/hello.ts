// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

// import fs from "fs";
// import path from "path";
// const templateDirectory = path.resolve(process.cwd(), "templates");
// const filePath = path.join(templateDirectory, "background-2.png");
// const imageBuffer = fs.readFileSync(filePath);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
