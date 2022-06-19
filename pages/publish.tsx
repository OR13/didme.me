import type { NextPage } from "next";
import Head from "next/head";

import AppPage from "../components/app-page";

import { Button, Stack } from "@mui/material";
import { FileUploader } from "../components/file-uploader";
import { client } from "../core/ipfs";

import bs58 from "bs58";
import { bech32 } from "bech32";

import f5stego from "f5stegojs";

const readFileAsDataUrl = async (file: any): Promise<any> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (event: any) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
};

const dataUrlToArrayBufferAndType = (dataUrl: string) => {
  const [type, encodedContent] = dataUrl.split(";base64,");
  function _base64ToArrayBuffer(base64: string) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  return {
    type: type.replace("data:", ""),
    content: _base64ToArrayBuffer(encodedContent),
  };
};

const createLocalImage = (
  fileData: ArrayBuffer,
  fileType: string,
  onload: any
) => {
  const urlCreator = window.URL || window.webkitURL;
  const img = new Image();
  img.onload = onload;
  img.src = urlCreator.createObjectURL(
    new Blob([fileData], { type: fileType })
  );
  return img;
};

const addFileToCanvas = async (canvasId: string, file: any) => {
  const dataUrl = await readFileAsDataUrl(file);
  const { type, content } = dataUrlToArrayBufferAndType(dataUrl);
  const canvas: any = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  const img = createLocalImage(content, type, function () {
    canvas.width = img.width * window.devicePixelRatio;
    canvas.height = img.height * window.devicePixelRatio;
    ctx.drawImage(
      img,
      0,
      0,
      canvas.width,
      canvas.height, // source rectangle
      0,
      0,
      canvas.width * window.devicePixelRatio,
      canvas.height * window.devicePixelRatio
    );
  });
};

const getCompressedJpegFromCanvas = (canvasId: string) => {
  const canvas: any = document.getElementById(canvasId);
  const inputDataUri = canvas.toDataURL("image/jpeg");
  const inputBuffer = Buffer.from(inputDataUri.split(",").pop(), "base64");
  const imageArray = new Uint8Array(inputBuffer);
  return imageArray;
};

const getSteganographicBlob = (canvasId: string, did: string) => {
  const plaintext = did.split("did:key:")[1];

  // not sure of strength of this...
  // better  to encrypt plaintext before embedding.
  // if you want encryption.
  const stegKey = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const stegger = new f5stego(stegKey); // init stegger with key

  const imageArray = getCompressedJpegFromCanvas(canvasId);
  const dataArray = new Uint8Array(Buffer.from(plaintext));

  // embedding
  const secretImage = stegger.embed(imageArray, dataArray);

  // validation
  try {
    const extractedMessage = stegger.extract(secretImage);
    const extractedMessageAsString = Buffer.from(extractedMessage).toString();
    if (extractedMessageAsString !== plaintext) {
      throw new Error("plaintext could not be recovered.");
    }
  } catch (e) {
    console.error(e);
    throw new Error("Steganographic encoding failed");
  }
  const blob = new Blob([secretImage], {
    type: "image/jpeg",
  });
  return blob;
};

const uploadBlobAsDidMeme = async (blob: any) => {
  const file = await client.add(blob);
  const cid = file.cid.toString();
  const buffer = bs58.decode(cid);
  const words = bech32.toWords(buffer);
  const didMeme = bech32.encode("did:meme:", words);
  return didMeme;
};

const canvasToDidMeme = async (canvasId: string, didKey: string) => {
  const blob = getSteganographicBlob(canvasId, didKey);
  const didMeme = await uploadBlobAsDidMeme(blob);
  return didMeme;
};

const did = "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn";
const canvasId = "meme-canvas";

const Publish: NextPage = () => {
  const handleFile = (files: any[]) => {
    const [file] = files;
    addFileToCanvas(canvasId, file);
  };

  const handlePublish = async () => {
    console.log("publish...");
    const didMeme = await canvasToDidMeme(canvasId, did);
    console.log(didMeme);
    return didMeme;
  };
  return (
    <>
      <Head>
        <title>did:meme</title>
        <meta
          name="description"
          content="Decentralized identifiers hidden in memes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppPage>
        <Stack spacing={2}>
          <Button variant={"contained"} onClick={handlePublish}>
            Publish
          </Button>
          <FileUploader onFilesAccepted={handleFile} />
          <canvas id="meme-canvas" style={{ height: "512px" }} />
        </Stack>
      </AppPage>
    </>
  );
};

export default Publish;
