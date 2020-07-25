import React from "react";
import PropTypes from "prop-types";
import crypto from "crypto";
import Base from "../base/base";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Ed25519KeyPair, driver } from "@transmute/did-key-ed25519";
import { X25519KeyPair } from "@transmute/did-key-x25519";
const base64url = require("base64url");
var f5stego = require("f5stegojs");
var toBuffer = require("blob-to-buffer");

export const Home = (props) => {
  const [state, setState] = React.useState({
    keys: null,
    didDocument: null,
    image: "https://imgflip.com/s/meme/One-Does-Not-Simply.jpg",
    text: "One does not simply make a meme generator.",
  });
  React.useEffect(() => {
    if (state.keys === null) {
      (async () => {
        const ed25519Key = await Ed25519KeyPair.generate({
          secureRandom: () => {
            return crypto.randomBytes(32);
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
    const reader = new FileReader();
    reader.onload = async (e2) => {
      const text = e2.target.result;
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
          state.text.toUpperCase(),
          canvas.width / 2,
          canvas.height / 1.2,
          canvas.width,
          0.17 * myImg.height
        );
      };
      // could do file conversion here...
      // for now, only jpegs work.
      var blob = new Blob([text], { type: "image/jpeg" });
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(blob);
      myImg.src = imageUrl;
      var stegKey = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      var stegger = new f5stego(stegKey); // init stegger with key
      const imageArray = new Uint8Array(text);
      const payload = state.didDocument.id.split("did:key:")[1];
      const dataArray = new Uint8Array(Buffer.from(payload));
      var secretImage = stegger.embed(imageArray, dataArray);
      var extractedMessage = stegger.extract(secretImage);
      console.log(Buffer.from(extractedMessage).toString()); // works...
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };

  return (
    <Base>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            variant={"contained"}
            color={"secondary"}
            onClick={() => {
              document.getElementById("fileUpload").click();
            }}
          >
            Upload Image
          </Button>
          <input
            id="fileUpload"
            style={{ display: "none" }}
            type="file"
            onChange={(e) => showFile(e)}
          />
          <br />
          <br />
          <TextField
            label="Text"
            value={state.text}
            fullWidth
            onChange={(event) => {
              setState({
                ...state,
                text: event.target.value,
              });
            }}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <div id="meme-container">
            <span id="img-text">{state.text}</span>
            <img id="img-src" src={state.image} />
          </div>
        </Grid> */}

        <Grid item xs={12}>
          <div id="canvas-container">
            <canvas id="meme-canvas" />
          </div>
        </Grid>
      </Grid>

      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </Base>
  );
};

Home.propTypes = {
  wallet: PropTypes.any,
};
