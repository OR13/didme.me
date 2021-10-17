import { client, ipfsGateway } from "./ipfs";
import concat from "it-concat";
import { documentLoader } from "./documentLoader";
import { bech32 } from "bech32";
const bs58 = require("bs58");

var f5stego = require("f5stegojs");

export const resolve = async (did: string) => {
  did = did.split("#")[0];
  const decoded = bech32.decode(did);
  const decodedCid = bs58.encode(bech32.fromWords(decoded.words));
  // depending on the client network, this CID may take a while to find...
  const source = client.get(decodedCid, { timeout: 4000 });
  const file = await source.next();
  const bufferList: any = await concat(file.value.content);
  const content = bufferList.copy();

  var stegKey = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var stegger = new f5stego(stegKey); // init stegger with key
  const secretImage = content;
  var extractedMessage = stegger.extract(secretImage);

  const fragment = Buffer.from(extractedMessage).toString();

  const { document }: any = await documentLoader(`did:key:${fragment}`);

  let asString = JSON.stringify(document.didDocument);

  const pattern = `did:key:${fragment}`;
  asString = asString.replace(new RegExp(pattern, "g"), did);
  const updatedDidDocument = JSON.parse(asString);

  const didDocument = {
    ...updatedDidDocument,
  };

  return {
    didDocument,
    didDocumentMetadata: {
      image: `${ipfsGateway}/ipfs/${decodedCid}`,
    },
  };
};
