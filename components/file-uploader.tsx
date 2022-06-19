import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Paper, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";

export const FileUploader = ({ onFilesAccepted }: any) => {
  const theme = useTheme();

  const onDrop = useCallback(
    (acceptedFiles) => {
      onFilesAccepted(acceptedFiles);
    },
    [onFilesAccepted]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Paper
      {...getRootProps()}
      style={{
        padding: "32px",
        background: !isDragActive
          ? theme.palette.background.paper
          : theme.palette.background.paper,
        border: !isDragActive
          ? "1px " + theme.palette.primary.main + " dashed"
          : "1px " + theme.palette.secondary.main + " dashed",
        boxShadow: "none",
        textAlign: "center",

        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography color={theme.palette.secondary.main}>
          Drop the file here ...
        </Typography>
      ) : (
        <Typography color={theme.palette.primary.main}>
          Drag images here, or click to select.
        </Typography>
      )}
    </Paper>
  );
};
