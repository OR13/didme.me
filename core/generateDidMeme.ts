import { client, urlSource } from "./ipfs";

import bs58 from "bs58";
import { bech32 } from "bech32";

var f5stego = require("f5stegojs");

function blobToDataURL(blob: any, callback: any) {
  var a = new FileReader();
  a.onload = function (e: any) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
}

// generate from did:key
export const generateDidMeme = (did: string) => {
  return new Promise(async (resolve, reject) => {
    var stegKey = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var stegger = new f5stego(stegKey); // init stegger with key
    const canvas: any = document.getElementById("meme-canvas");
    const inputDataUri = canvas.toDataURL("image/jpeg", 1);
    const inputBuffer = Buffer.from(inputDataUri.split(",").pop(), "base64");
    const imageArray = new Uint8Array(inputBuffer);
    const payload = did.split("did:key:")[1];
    const dataArray = new Uint8Array(Buffer.from(payload));
    const secretImage = stegger.embed(imageArray, dataArray);

    var extractedMessage = stegger.extract(secretImage);
    const extractedMessageAsString = Buffer.from(extractedMessage).toString();

    if (extractedMessageAsString !== payload) {
      reject("steg embed failed.");
    }

    var blob = new Blob([secretImage], {
      type: "image/jpeg",
    });
    const file = await client.add(blob);
    const cid = file.cid.toString();
    const buffer = bs58.decode(cid);
    let words = bech32.toWords(buffer);
    const didMeme = bech32.encode("did:meme:", words);
    resolve(didMeme);
  });
};
