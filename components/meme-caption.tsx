import React from "react";
import { Typography, TextField } from "@mui/material";
import { updateCanvas } from "../core/updateCanvas";

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";

import MemoryIcon from "@mui/icons-material/Memory";
import * as bip39 from "bip39";
import * as hdkey from "hdkey";

export const DIDMEME_BIP44_COIN_TYPE = "42";
import { generators } from "../core/generators";

export const MemeCaption = ({ file, setConfig }: any) => {
  const [caption, setCaption] = React.useState("did meme");
  const [mnemonic, setMnemonic] = React.useState(
    "" // uncomment to debug without wasting ipfs time...
    // "sell antenna drama rule twenty cement mad deliver you push derive hybrid"
  );
  const [key, setKey] = React.useState("");

  if (file === null) {
    return <>Loading...</>;
  }

  React.useEffect(() => {
    if (key === "") {
      updateCanvas(file, caption);
      handleUpdateKey(mnemonic);
    }
    if (mnemonic === "") {
      handleGenerateMnemonic();
    }
  }, [key, file]);

  const handleTextChange = (text: string) => {
    updateCanvas(file, text);
    setCaption(text);
  };

  const handleGenerateMnemonic = async () => {
    const m = bip39.generateMnemonic();
    setMnemonic(m);
    handleUpdateKey(m);
  };

  const handleUpdateKey = async (mnemonic: string) => {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const hdPath = `m/44'/${DIDMEME_BIP44_COIN_TYPE}'/0'/0/0`;
    const addrNode = root.derive(hdPath);

    const res = await generators.ed25519(addrNode._privateKey);
    setKey(res.didDocument.id);

    setConfig({ key: res.didDocument.id, mnemonic });
  };

  return (
    <div style={{ maxWidth: "512px", margin: "auto" }}>
      <canvas id="meme-canvas" />
      <Typography variant={"caption"}>{file.path}</Typography>
      <TextField
        style={{ marginTop: "32px" }}
        label="Caption"
        value={caption}
        fullWidth
        onChange={(event: any) => {
          handleTextChange(event.target.value);
        }}
      />

      <TextField
        label="Key"
        value={key.substring(0, 16) + "..."}
        disabled
        fullWidth
        style={{ marginTop: "32px" }}
      />

      <TextField
        style={{ marginTop: "32px" }}
        label="Mnemonic"
        multiline
        value={mnemonic}
        fullWidth
        disabled={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleGenerateMnemonic}
              >
                <MemoryIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
