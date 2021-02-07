import React from "react";
import Button from "@material-ui/core/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Base from "../base/base";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import { JSONEditor } from "@transmute/material-did-core";

import { verifyCredential } from "./credentialHelper";
import history from "../../store/history";

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

export const Verify = () => {
  const [editorValue, setEditorValue] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

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
      const credentialJson = JSON.parse(fileData);
      const verification = await verifyCredential(credentialJson);
      setAlertMessage(
        verification.verified
          ? "Credential is verified"
          : "Credential verification failed"
      );

      setEditorValue(JSON.stringify(credentialJson, null, 2));
      setSnackbarOpen(true);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Base
      cta={
        <>
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
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            alertMessage.includes("verification failed") ? "error" : "success"
          }
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      {!editorValue.length ? (
        <div
          style={{
            textAlign: "center",
            padding: "32px",
            marginTop: "64px",
          }}
        >
          <Typography variant={"h4"} gutterBottom>
            Add a credential file to verify
          </Typography>

          <Typography gutterBottom>
            You can issue a credential after{" "}
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/");
              }}
            >
              creating a new did:meme
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
            Load Credential
          </Button>
        </div>
      ) : (
        <>
          <JSONEditor value={editorValue} onChange={setEditorValue} />
        </>
      )}
    </Base>
  );
};
