import React from "react";
import PropTypes from "prop-types";

import Base from "../base/base";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { Ed25519KeyPair, driver } from "@transmute/did-key-ed25519";
import { X25519KeyPair } from "@transmute/did-key-x25519";

// import crypto from "crypto";
import { blobToDataURL, download, updateCanvas } from "../../core";
import { client, urlSource } from "../../core/ipfs";

import history from "../../store/history";

var f5stego = require("f5stegojs");
const bs58 = require("bs58");
let bech32 = require("bech32");

export const Home = (props) => {
  const [state, setState] = React.useState({
    isLoading: false,
    keys: null,
    didDocument: null,
    text: "One does not simply make a meme generator.",
  });
  React.useEffect(() => {
    if (state.keys === null) {
      (async () => {
        const ed25519Key = await Ed25519KeyPair.generate({
          secureRandom: () => {
            const random = crypto.randomBytes(32);
            // console.log(Buffer.from(random).toString("hex"));
            // const notRandom = Buffer.from(
            //   "81a750ab714edeb5328ff13f938c0390ec411b3413f33ee513c38a97a1ce5181",
            //   "hex"
            // );
            return random;
          },
        });
        const x25519Key = await X25519KeyPair.fromEdKeyPair(ed25519Key);
        const didDocument = driver.keyToDidDoc(ed25519Key);
        setState((state) => {
          return {
            ...state,
            keys: { ed25519Key, x25519Key },
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
          const key = state.keys.ed25519Key;
          let asString = JSON.stringify(key);
          asString = asString.replace(`${key.controller}`, didMeme);
          const updatedKey = JSON.parse(asString);
          const exported = JSON.stringify(
            {
              id: didMeme,
              url: `https://ipfs.io/ipfs/${cid}`,
              key: updatedKey,
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

  return (
    <Base>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {state.file && (
            <div style={{ width: "100%" }}>
              <Box display="flex">
                <Box p={1} width="100%">
                  <TextField
                    label="Text"
                    value={state.text}
                    fullWidth
                    onChange={(event) => {
                      setState({
                        ...state,
                        text: event.target.value,
                      });
                      updateCanvas(state.file, event.target.value);
                    }}
                  />
                </Box>
                <Box p={1} flexShrink={1}>
                  {state.isLoading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <Button
                      variant={"contained"}
                      color={"secondary"}
                      disabled={state.isLoading}
                      onClick={() => {
                        handlePublish();
                      }}
                    >
                      Publish Meme
                    </Button>
                  )}
                </Box>
              </Box>
            </div>
          )}
        </Grid>

        <Grid item xs={12}>
          {state.file ? (
            <div id="canvas-container">
              <canvas id="meme-canvas" />
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "32px" }}>
              <Typography variant={"h5"} gutterBottom>
                Add an image to get started.
              </Typography>
              <Button
                variant={"contained"}
                color={"secondary"}
                onClick={() => {
                  document.getElementById("fileUpload").click();
                }}
              >
                Add Image
              </Button>
              <input
                id="fileUpload"
                style={{ display: "none" }}
                type="file"
                onChange={(e) => showFile(e)}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </Base>
  );
};

Home.propTypes = {
  wallet: PropTypes.any,
};
