import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Base from "../base/base";
import ShareIcon from "@material-ui/icons/Share";
import CreateIcon from "@material-ui/icons/Create";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import { v4 as uuidv4 } from "uuid";
import { JSONEditor } from "@transmute/material-did-core";
import { resolve, download } from "../../core";
import { issueVc } from "./credentialHelper";
import history from "../../store/history";

const c1 = require("./credential.json");

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

export const Issue = () => {
  const [keyFile, setKeyFile] = React.useState({});

  const [editorValue, setEditorValue] = React.useState("");

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
      const keyData = JSON.parse(fileData);
      const { didMethodMetadata } = await resolve(keyData.id);

      const suiteContext =
        keyData.keys.bls12381_g2 !== undefined
          ? "https://w3id.org/security/bbs/v1"
          : "https://w3id.org/security/jws/v1";

      const updatedCredential = {
        ...c1,
        id: "urn:uuid:" + uuidv4(),
        "@context": [
          ...c1["@context"],
          suiteContext,
          {
            image: "https://schema.org/image",
          },
        ],
        issuer: {
          id: keyData.id,
          image: didMethodMetadata.memeUrl,
        },
        issuanceDate: new Date().toISOString(),
      };
      setEditorValue(JSON.stringify(updatedCredential, null, 2));
      setKeyFile(keyData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleIssue = async () => {
    const vc = await issueVc(keyFile, JSON.parse(editorValue));
    download("did-meme-credential.json", JSON.stringify(vc, null, 2));
  };

  return (
    <Base
      cta={
        <>
          {!keyFile.id ? (
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
                endIcon={<CreateIcon />}
                onClick={handleIssue}
              >
                Issue
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

      {!keyFile.id ? (
        <div
          style={{
            textAlign: "center",
            padding: "32px",
            marginTop: "64px",
          }}
        >
          <Typography variant={"h4"} gutterBottom>
            Add a keyfile to issue from
          </Typography>

          <Typography gutterBottom>
            You can generate a key file by{" "}
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
            Load Keyfile
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
