import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

import axios from "axios";

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, "g"), replace);
}

// Based on https://huggingface.co/spaces/dalle-mini/dalle-mini
// TODO: replace with Open AI if they make it possible.

// for testing purposes
// import stub from "./stub.json";

const getImages = async (promptText: string) => {
  const response: any = await axios.post(
    "https://bf.dallemini.ai/generate",
    { prompt: promptText },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const images = response.data.images.map((i: any) => {
    return "data:image/png;base64," + replaceAll(i, "\n", "");
  });
  const result = { images };
  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const promptText = req.body.prompt;
  const result = await getImages(promptText);
  res.status(200).json(result);
}
