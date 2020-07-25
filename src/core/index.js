import { client, urlSource } from "./ipfs";
import concat from "it-concat";
import { Ed25519KeyPair, driver } from "@transmute/did-key-ed25519";
const bs58 = require("bs58");
let bech32 = require("bech32");
var f5stego = require("f5stegojs");

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

const didToResolutionResponse = async (did) => {
  const decoded = bech32.decode(did);
  const decodedCid = bs58.encode(bech32.fromWords(decoded.words));
  const memeUrl = `https://ipfs.io/ipfs/${decodedCid}`;

  const source = client.get(decodedCid, { timeout: 2000 });
  const file = await source.next();
  const bufferList = await concat(file.value.content);
  const content = bufferList.copy();

  var stegKey = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var stegger = new f5stego(stegKey); // init stegger with key
  const secretImage = content;
  var extractedMessage = stegger.extract(secretImage);

  const fragment = Buffer.from(extractedMessage).toString();

  const didDocument = await driver.get({
    did: `did:key:${fragment}`,
  });
  let asString = JSON.stringify(didDocument);
  asString = asString.replace(/did:key:/g, "did:meme:");
  const updatedDoc = JSON.parse(asString);

  return {
    didDocument: updatedDoc,
    content: null,
    contentType: null,
    resolverMetadata: {
      duration: 0,
      identifier: did,
      driverId: "driver-unknown",
      didUrl: {
        didUrlString: did,
        did: {
          didString: did,
          method: "elem",
          methodSpecificId: did.split(":").pop(),
          parseTree: null,
          parseRuleCount: null,
        },
        parameters: null,
        parametersMap: {},
        path: "",
        query: null,
        fragment: null,
        parseTree: null,
        parseRuleCount: null,
      },
    },
    methodMetadata: {
      memeUrl,
    },
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

const updateCanvas = (file, text) => {
  const reader = new FileReader();
  reader.onload = async (e2) => {
    var canvas = document.getElementById("meme-canvas");
    var ctx = canvas.getContext("2d");
    var myImg = new Image();
    myImg.onload = function () {
      canvas.width = myImg.width * window.devicePixelRatio;
      canvas.height = myImg.height * window.devicePixelRatio;
      function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(" ");
        var line = "";
        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + " ";
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
          } else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
        context.strokeText(line, x, y);
      }

      ctx.drawImage(
        myImg,
        0,
        0,
        myImg.width * window.devicePixelRatio,
        myImg.height * window.devicePixelRatio, // source rectangle
        0,
        0,
        canvas.width * window.devicePixelRatio,
        canvas.height * window.devicePixelRatio
      );
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.textAlign = "center";
      ctx.font = `900 ${0.17 * myImg.height}px Impact`;
      wrapText(
        ctx,
        text.toUpperCase(),
        canvas.width / 2,
        canvas.height / 1.2,
        canvas.width,
        0.17 * myImg.height
      );
    };

    var blob = new Blob([e2.target.result], { type: "image/jpeg" });
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(blob);
    myImg.src = imageUrl;
  };

  reader.readAsArrayBuffer(file);
};

export {
  getExported,
  didToResolutionResponse,
  download,
  dataURLtoBlob,
  blobToDataURL,
  updateCanvas,
};
