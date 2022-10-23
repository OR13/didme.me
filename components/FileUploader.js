import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Paper, Typography } from '@mui/material';
import { green, blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
    secondary: green
  }
});

const FileUploader = ({ onFilesAccepted, sx }) => {
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
      align="center"
      style={{
        padding: '32px',
        background: !isDragActive
          ? theme.palette.background.paper
          : theme.palette.background.paper,
        border: !isDragActive
          ? '1px ' + theme.palette.primary.main + ' dashed'
          : '1px ' + theme.palette.secondary.main + ' dashed',
        boxShadow: 'none',
        textAlign: 'center',
        cursor: 'pointer'
      }}
      sx={{
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
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

export default FileUploader;
