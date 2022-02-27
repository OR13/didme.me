import React from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import { Button, Grid } from "@mui/material";
import BiotechIcon from "@mui/icons-material/Biotech";
import { useRouter } from "next/router";

const JsonVerifier = ({ value }: any) => {
  const router = useRouter();
  const [text, setText] = React.useState(value);
  const handleChange = (newText: any) => {
    setText(newText);
  };
  const handleVerify = () => {
    const messageParam: any = text;
    router.push("/v/" + messageParam);
  };
  return (
    <>
      <Grid container style={{ marginBottom: "8px" }}>
        <Grid item style={{ flexGrow: 1 }}></Grid>
        <Grid item>
          <Button
            endIcon={<BiotechIcon />}
            onClick={handleVerify}
            variant={"outlined"}
            color={"primary"}
            style={{ marginTop: "16px" }}
          >
            Verify
          </Button>
        </Grid>
      </Grid>
      <AceEditor
        mode="text"
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

export default JsonVerifier;
