import React from "react";
import { yellow } from "@mui/material/colors";
import { Typography, TextField } from "@mui/material";
import { updateCanvas } from "../core/updateCanvas";

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";

import MemoryIcon from "@mui/icons-material/Memory";
import * as bip39 from "bip39";
import * as hdkey from "hdkey";
import { defaultMnemonic } from "../core/defaultMnemonic";
export const DIDMEME_BIP44_COIN_TYPE = "42";
import { generators } from "../core/generators";
import WarningIcon from "@mui/icons-material/Warning";
export const MemeCaption = ({ file, setConfig }: any) => {
  const [caption, setCaption] = React.useState("did meme");
  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);
  const [key, setKey] = React.useState("");

  const handleTextChange = (text: string) => {
    updateCanvas(file, text);
    setCaption(text);
  };

  const handleUpdateKey = React.useCallback(
    async (mnemonic: string) => {
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const root = hdkey.fromMasterSeed(seed);
      const hdPath = `m/44'/${DIDMEME_BIP44_COIN_TYPE}'/0'/0/0`;
      const addrNode = root.derive(hdPath);

      const res = await generators.ed25519(addrNode._privateKey);
      setKey(res.didDocument.id);

      setConfig({ key: res.didDocument.id, mnemonic });
    },
    [setKey, setConfig]
  );

  const handleGenerateMnemonic = React.useCallback(async () => {
    const m = bip39.generateMnemonic();
    setMnemonic(m);
    handleUpdateKey(m);
  }, [handleUpdateKey]);

  React.useEffect(() => {
    if (key === "") {
      updateCanvas(file, caption);
      handleUpdateKey(mnemonic);
    }
    if (mnemonic === "") {
      handleGenerateMnemonic();
    }
  }, [key, file, caption, handleGenerateMnemonic, handleUpdateKey, mnemonic]);

  if (file === null) {
    return <>Loading...</>;
  }

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
        label="Controller"
        value={key.substring(0, 16) + "..."}
        disabled
        fullWidth
        style={{ marginTop: "32px" }}
      />

      <TextField
        color="warning"
        focused
        style={{ marginTop: "32px" }}
        label="Controller Mnemonic"
        helperText={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "8px",
            }}
          >
            <WarningIcon color={"warning"} />
            <Typography style={{ marginLeft: "9px", color: yellow["700"] }}>
              Anyone knowing this phrase controls this meme.
            </Typography>
          </div>
        }
        multiline
        value={mnemonic}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="generate mnemonic"
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
