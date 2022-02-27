import React from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-pastel_on_dark";

import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from "next/router";

import CreateIcon from "@mui/icons-material/Create";
import { defaultMnemonic, defaultIssuer } from "../core/defaultMnemonic";

import { issueCredential } from "../vc-api";

import AdvancedKeyType from "./advanced-key-type";

const JsonCredentialIssuer = ({ value }: any) => {
  const router = useRouter();
  const [text, setText] = React.useState(JSON.stringify(value, null, 2));
  const handleChange = (newText: any) => {
    setText(newText);
  };

  const [issuer, setIssuer] = React.useState(defaultIssuer);
  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);

  const [advancedConfiguration, setAdvancedConfiguration] = React.useState({
    hdpath: `m/44'/0'/0'/0/0`,
    keyType: "ed25519",
    format: "vc-jwt",
    suite: "JsonWebSignature2020",
  });

  const handleUpdateToAdvancedConfiguration = (newState: any) => {
    const updateAdvancedConfig = {
      ...newState,
    };
    setAdvancedConfiguration(updateAdvancedConfig);
  };

  const handleUpdateIssuer = (issuer: string) => {
    setIssuer(issuer);
    try {
      const credential = JSON.parse(text);

      if (credential.issuer.id) {
        credential.issuer.id = issuer;
      } else {
        credential.issuer = issuer;
      }
      setText(JSON.stringify(credential, null, 2));
    } catch (e) {
      // console.error(e);
      //
    }
  };

  const handleMnemonicChange = async (newMnemonic: string) => {
    setMnemonic(newMnemonic);
  };
  const handleIssue = async () => {
    const vc = await issueCredential({
      credential: JSON.parse(text),
      mnemonic,
      keyType: advancedConfiguration.keyType,
      hdpath: advancedConfiguration.hdpath,
    });
    router.push("/v/" + vc);
  };
  return (
    <>
      <TextField
        label="Issuer"
        multiline
        value={issuer}
        onChange={(event) => {
          handleUpdateIssuer(event.target.value);
        }}
        fullWidth
      />
      <TextField
        label="Mnemonic for Issuer"
        multiline
        value={mnemonic}
        onChange={(event) => {
          handleMnemonicChange(event.target.value);
        }}
        style={{ marginBottom: "32px", marginTop: "32px" }}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="issue credential"
                onClick={handleIssue}
                color={"primary"}
              >
                <CreateIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <div style={{ marginBottom: "16px" }}>
        <AdvancedKeyType
          advancedConfiguration={advancedConfiguration}
          setAdvancedConfiguration={handleUpdateToAdvancedConfiguration}
        />
      </div>

      <AceEditor
        mode="json"
        theme="pastel_on_dark"
        style={{ width: "100%" }}
        onChange={handleChange}
        wrapEnabled={true}
        value={text}
        editorProps={{ $blockScrolling: true, useWorker: false }}
      />
    </>
  );
};

export default JsonCredentialIssuer;
