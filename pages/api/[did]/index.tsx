import type { NextApiRequest, NextApiResponse } from "next";

import { getResolutionResult } from "../../../core/getResolutionResult";

type Data = {
  didDocument: any;
  didResolutionMetadata: any;
  didDocumentMetadata: any;
};

const recentTweets = require("./tweets.json");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { did } = req.query;
  const result: Data = await getResolutionResult(did as string);
  result.didResolutionMetadata.recentTweets = recentTweets;
  res.status(200).json(result);
}
