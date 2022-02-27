import React from "react";
import { yellow } from "@mui/material/colors";
import { Typography, TextField } from "@mui/material";
import { updateCanvas } from "../core/updateCanvas";

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";

import MemoryIcon from "@mui/icons-material/Memory";
import Grid from "@mui/material/Grid";

import * as bip39 from "bip39";
import * as hdkey from "hdkey";
import { defaultMnemonic } from "../core/defaultMnemonic";

import { generators } from "../core/generators";
import WarningIcon from "@mui/icons-material/Warning";

import AdvancedKeyType from "./advanced-key-type";
export const MemeCaption = ({ file, setConfig }: any) => {
  const [caption, setCaption] = React.useState("did meme");
  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);
  const [key, setKey] = React.useState("");
  const [advancedConfiguration, setAdvancedConfiguration] = React.useState({
    hdpath: `m/44'/0'/0'/0/0`,
    keyType: "ed25519",
  });

  const handleTextChange = (text: string) => {
    updateCanvas(file, text);
    setCaption(text);
  };

  const handleUpdateToAdvancedConfiguration = (newState: any) => {
    setAdvancedConfiguration(newState);
    if (
      newState.keyType !== advancedConfiguration.keyType ||
      newState.hdpath !== advancedConfiguration.hdpath
    ) {
      handleUpdateKey(newState.keyType, mnemonic, newState.hdpath);
    }
  };

  const handleUpdateKey = React.useCallback(
    async (keyType: string, mnemonic: string, hdpath: string) => {
      try {
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = hdkey.fromMasterSeed(seed);
        const addrNode = root.derive(hdpath);
        const res = await generators.didKey(keyType, addrNode._privateKey);
        setKey(res.didDocument.id);
        setConfig({ key: res.didDocument.id, mnemonic });
      } catch (e) {
        console.error(e);
      }
    },
    [setKey, setConfig]
  );

  const handleGenerateMnemonic = React.useCallback(async () => {
    const m = bip39.generateMnemonic();
    setMnemonic(m);
    handleUpdateKey(
      advancedConfiguration.keyType,
      m,
      advancedConfiguration.hdpath
    );
  }, [advancedConfiguration, handleUpdateKey]);

  React.useEffect(() => {
    if (key === "") {
      updateCanvas(file, caption);
      handleUpdateKey(
        advancedConfiguration.keyType,
        mnemonic,
        advancedConfiguration.hdpath
      );
    }
    if (mnemonic === "") {
      handleGenerateMnemonic();
    }
  }, [
    key,
    file,
    caption,
    handleGenerateMnemonic,
    handleUpdateKey,
    mnemonic,
    advancedConfiguration,
  ]);

  if (file === null) {
    return <>Loading...</>;
  }

  return (
    <Grid container spacing={2} flexGrow={1}>
      <Grid item md={12} lg={6}>
        <div style={{ margin: "auto" }}>
          <canvas id="meme-canvas" />
          <Typography variant={"caption"}>{file.path}</Typography>
          <TextField
            sx={{ mt: 2 }}
            label="Caption"
            value={caption}
            fullWidth
            onChange={(event: any) => {
              handleTextChange(event.target.value);
            }}
          />
        </div>
      </Grid>
      <Grid item md={12} lg={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{ mt: 2 }}
              label="Controller"
              value={key.substring(0, 24) + "..."}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <AdvancedKeyType
              advancedConfiguration={advancedConfiguration}
              setAdvancedConfiguration={handleUpdateToAdvancedConfiguration}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ mt: 1 }}
              color="warning"
              focused
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
                  <Typography
                    style={{ marginLeft: "9px", color: yellow["700"] }}
                  >
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
