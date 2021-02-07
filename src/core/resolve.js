import { client } from "./ipfs";
import concat from "it-concat";
import { documentLoader } from "./documentLoader";

const bs58 = require("bs58");
let bech32 = require("bech32");
var f5stego = require("f5stegojs");

export const resolve = async (did) => {
  did = did.split("#")[0];
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

  const { document } = await documentLoader(`did:key:${fragment}`);

  let asString = JSON.stringify(document.didDocument);
  asString = asString.replaceAll(`did:key:${fragment}`, did);
  const updatedDidDocument = JSON.parse(asString);

  const didDocument = {
    ...updatedDidDocument,
  };

  return {
    didDocument,
    content: null,
    contentType: null,
    didResolverMetadata: {
      duration: 0,
      identifier: did,
      driverId: "driver-unknown",
      didUrl: {
        didUrlString: did,
        did: {
          didString: did,
          method: "meme",
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
    didMethodMetadata: {
      memeUrl,
    },
  };
};
