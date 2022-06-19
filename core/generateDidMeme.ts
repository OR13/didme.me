import { client } from "./ipfs";

import bs58 from "bs58";
import { bech32 } from "bech32";

const f5stego = require("f5stegojs");

import { toast } from "react-toastify";
// generate from did:key
export const generateDidMeme = (did: string) => {
  return new Promise(async (resolve, reject) => {
    const stegKey = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const stegger = new f5stego(stegKey); // init stegger with key
    const canvas: any = document.getElementById("meme-canvas");
    const inputDataUri = canvas.toDataURL("image/jpeg", 1);
    const inputBuffer = Buffer.from(inputDataUri.split(",").pop(), "base64");
    const imageArray = new Uint8Array(inputBuffer);
    const payload = did.split("did:key:")[1];
    const dataArray = new Uint8Array(Buffer.from(payload));
    const secretImage = stegger.embed(imageArray, dataArray);

    try {
      const extractedMessage = stegger.extract(secretImage);
      const extractedMessageAsString = Buffer.from(extractedMessage).toString();
      if (extractedMessageAsString !== payload) {
        throw new Error("Unable to recover key");
      }
    } catch (e) {
      console.error(e);
      toast.error("Unable to create did meme");
      reject("steg embed failed.");
    }

    const blob = new Blob([secretImage], {
      type: "image/jpeg",
    });
    const file = await client.add(blob);
    const cid = file.cid.toString();
    const buffer = bs58.decode(cid);
    const words = bech32.toWords(buffer);
    const didMeme = bech32.encode("did:meme:", words);
    resolve(didMeme);
  });
};
