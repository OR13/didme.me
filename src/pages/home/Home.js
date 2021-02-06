import React from "react";

import Base from "../base/base";

import Grid from "@material-ui/core/Grid";

import { JSONEditor } from "@transmute/material-did-core";

import { blobToDataURL, download, updateCanvas } from "../../core";
import { client, urlSource } from "../../core/ipfs";

import history from "../../store/history";
import { PrimaryCallToAction } from "../../components/PrimaryCallToAction";
import { MemeEditor } from "../../components/MemeEditor";

import { generateKey } from "../../core";

var f5stego = require("f5stegojs");
const bs58 = require("bs58");
let bech32 = require("bech32");

export const Home = (props) => {
  const [state, setState] = React.useState({
    isLoading: false,
    selectedKeyType: "ed25519",
    keys: null,
    didDocument: null,
    text: "One does not simply make a meme generator.",
  });
  React.useEffect(() => {
    if (state.keys === null) {
      (async () => {
        const { keys, didDocument } = await generateKey(state.selectedKeyType);

        setState((state) => {
          return {
            ...state,
            keys,
            didDocument,
          };
        });
      })();
    }
  });

  const showFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setState({ ...state, file });
    updateCanvas(file, state.text);
  };

  const handlePublish = () => {
    setState({
      ...state,
      isLoading: true,
    });
    setTimeout(() => {
      try {
        var stegKey = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var stegger = new f5stego(stegKey); // init stegger with key
        const canvas = document.getElementById("meme-canvas");
        const inputDataUri = canvas.toDataURL("image/jpeg", 1);
        const inputBuffer = Buffer.from(
          inputDataUri.split(",").pop(),
          "base64"
        );
        const imageArray = new Uint8Array(inputBuffer);
        const payload = state.didDocument.id.split("did:key:")[1];
        const dataArray = new Uint8Array(Buffer.from(payload));
        const secretImage = stegger.embed(imageArray, dataArray);

        var extractedMessage = stegger.extract(secretImage);
        const extractedMessageAsString = Buffer.from(
          extractedMessage
        ).toString();

        if (extractedMessageAsString !== payload) {
          throw new Error("steg embed failed.");
        }

        var blob = new Blob([secretImage], {
          type: "image/jpeg",
        });

        blobToDataURL(blob, async (finalDataUrl) => {
          const file = await client.add(urlSource(finalDataUrl));
          const cid = file.cid.toString();
          const buffer = bs58.decode(cid);
          let words = bech32.toWords(buffer);
          const didMeme = bech32.encode("did:meme:", words);
          const decoded = bech32.decode(didMeme);
          const decodedCid = bs58.encode(bech32.fromWords(decoded.words));
          if (decodedCid !== cid) {
            throw new Error("bech32 decode failed....");
          }
          const keys = state.keys;
          let asString = JSON.stringify(keys);
          asString = asString.replaceAll(`${state.didDocument.id}`, didMeme);
          const updatedKey = JSON.parse(asString);
          const exported = JSON.stringify(
            {
              id: didMeme,
              url: `https://ipfs.io/ipfs/${cid}`,
              keys: updatedKey,
            },
            null,
            2
          );
          download(didMeme.replace(/:/, "-") + ".json", exported);
          setTimeout(() => {
            history.push("/" + didMeme);
          }, 1 * 1000);
        });
      } catch (e) {
        console.error(e);
      }
      setState({
        ...state,
        isLoading: false,
      });
    }, 1 * 1000);
  };

  const handleKeyTypeChange = async (newKeyType) => {
    const { keys, didDocument } = await generateKey(newKeyType);

    setState({
      ...state,
      selectedKeyType: newKeyType,
      keys,
      didDocument,
    });
  };

  const handleTextChange = (event) => {
    setState({
      ...state,
      text: event.target.value,
    });
    updateCanvas(state.file, event.target.value);
  };

  return (
    <Base
      isLoading={state.isLoading}
      publish={state.file ? handlePublish : undefined}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {state.file && (
            <MemeEditor
              isLoading={state.isLoading}
              memeText={state.text}
              selectedKeyType={state.selectedKeyType}
              handleKeyTypeChange={handleKeyTypeChange}
              handleTextChange={handleTextChange}
            />
          )}
        </Grid>

        {state.file ? (
          <>
            <Grid item xs={12} sm={6}>
              <div id="canvas-container" style={{ width: "100%" }}>
                <canvas id="meme-canvas" />
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div id="key-container">
                <JSONEditor value={JSON.stringify(state.keys, null, 2)} />
              </div>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <PrimaryCallToAction showFile={showFile} />
          </Grid>
        )}
      </Grid>
    </Base>
  );
};

Home.propTypes = {};
