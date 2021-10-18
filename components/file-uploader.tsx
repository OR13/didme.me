import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Paper, Typography } from "@mui/material";

import { lightBlue, blue } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

export const FileUploader = ({ onFilesAccepted }: any) => {
  const theme = useTheme();

  const onDrop = useCallback((acceptedFiles) => {
    onFilesAccepted(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Paper
      {...getRootProps()}
      style={{
        padding: "32px",
        background: !isDragActive
          ? theme.palette.primary.light
          : theme.palette.secondary.light,
        border: "1px " + theme.palette.primary.main + " dashed",
        boxShadow: "none",
        textAlign: "center",
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
