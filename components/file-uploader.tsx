import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Paper, Typography } from "@mui/material";

import { lightBlue, blue } from "@mui/material/colors";

export const FileUploader = ({ onFilesAccepted }: any) => {
  const onDrop = useCallback((acceptedFiles) => {
    onFilesAccepted(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Paper
      {...getRootProps()}
      style={{
        padding: "32px",
        background: !isDragActive ? lightBlue["50"] : lightBlue["100"],
        border: "1px " + lightBlue["200"] + " dashed",
        boxShadow: "none",
        textAlign: "center",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography color={blue["800"]}>Drop the file here ...</Typography>
      ) : (
        <Typography color={lightBlue["700"]}>
          Drag images here, or click to select.
        </Typography>
      )}
    </Paper>
  );
};
