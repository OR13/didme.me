import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Base from "../base/base";
import ShareIcon from "@material-ui/icons/Share";
import Grid from "@material-ui/core/Grid";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";

import { JSONEditor } from "@transmute/material-did-core";
import { download } from "../../core";
import { deriveProofFromFrame } from "./credentialHelper";
import history from "../../store/history";

const frame = require("./frame.json");

function Alert(props) {
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    />
  );
}

export const Derive = () => {
  const [credentialEditorValue, setCredentialEditorValue] = React.useState("");
  const [frameEditorValue, setFrameEditorValue] = React.useState("");

  const [snackBarOpen, setSnackbarOpen] = React.useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const showFile = async (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onload = async (e2) => {
      const fileData = Buffer.from(e2.target.result).toString();
      const fileJson = JSON.parse(fileData);
      setFrameEditorValue(JSON.stringify(frame, null, 2));
      setCredentialEditorValue(JSON.stringify(fileJson, null, 2));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDerive = async () => {
    const zkp = await deriveProofFromFrame(
      JSON.parse(credentialEditorValue),
      JSON.parse(frameEditorValue)
    );
    download("did-meme-kzp.json", JSON.stringify(zkp, null, 2));
  };

  return (
    <Base
      cta={
        <>
          {!frameEditorValue.length ? (
            <CopyToClipboard
              text={window.location.href}
              onCopy={() => {
                setSnackbarOpen(true);
              }}
            >
              <Button
                color={"secondary"}
                variant={"contained"}
                endIcon={<ShareIcon />}
              >
                Share
              </Button>
            </CopyToClipboard>
          ) : (
            <>
              <Button
                color={"secondary"}
                variant={"contained"}
                endIcon={<BorderColorIcon />}
                onClick={handleDerive}
              >
                Derive
              </Button>
            </>
          )}
        </>
      }
    >
      <input
        id="fileUpload"
        style={{ display: "none" }}
        type="file"
        onChange={(e) => showFile(e)}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Copied to clipboard!
        </Alert>
      </Snackbar>

      {!frameEditorValue.length ? (
        <div
          style={{
            textAlign: "center",
            padding: "32px",
            marginTop: "64px",
          }}
        >
          <Typography variant={"h4"} gutterBottom>
            Add a bbs+ credential to derive zkp from
          </Typography>

          <Typography gutterBottom>
            You can generate a bbs+ credential after creating a bls12381{" "}
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/");
              }}
            >
              did:meme
            </Link>
            .
          </Typography>
          <br />
          <Button
            variant={"contained"}
            color={"secondary"}
            onClick={() => {
              document.getElementById("fileUpload").click();
            }}
          >
            Load BBS+ Credential
          </Button>
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <JSONEditor value={credentialEditorValue} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <JSONEditor
              value={frameEditorValue}
              onChange={setFrameEditorValue}
            />
          </Grid>
        </Grid>
      )}
    </Base>
  );
};
