import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
export const PrimaryCallToAction = ({ showFile }) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "32px",
        marginTop: "64px",
      }}
    >
      <Typography variant={"h4"} gutterBottom>
        Add an image to get started.
      </Typography>

      <Typography gutterBottom>
        Data will be published to the public IPFS network.
        <br />
        There is no encryption applied here, only steganography and encoding.
        <br />
        DO NOT publish offensive content or data you do not own.
      </Typography>
      <br />
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
  );
};
