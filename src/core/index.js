import { client, urlSource } from "./ipfs";

import { updateCanvas } from "./updateCanvas";
import { generateKey } from "./generateKey";
import { resolve } from "./resolve";
const bs58 = require("bs58");
let bech32 = require("bech32");

const getExported = async (dataUrl) => {
  const file = await client.add(urlSource(dataUrl));
  const cid = file.cid.toString();
  const buffer = bs58.decode(cid);
  let words = bech32.toWords(buffer);
  const didMeme = bech32.encode("did:meme:", words);
  const decoded = bech32.decode(didMeme);
  const decodedCid = bs58.encode(bech32.fromWords(decoded.words));
  if (decodedCid !== cid) {
    throw new Error("bech32 decode failed....");
  }

  return {
    id: didMeme,
    url: `https://ipfs.io/ipfs/${cid}`,
    // key: state.keys.ed25519Key,
  };
};

const download = (filename, text) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

//**blob to dataURL**
function blobToDataURL(blob, callback) {
  var a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result);
  };
  a.readAsDataURL(blob);
}

export {
  generateKey,
  getExported,
  // didToResolutionResponse,
  resolve,
  download,
  dataURLtoBlob,
  blobToDataURL,
  updateCanvas,
};
