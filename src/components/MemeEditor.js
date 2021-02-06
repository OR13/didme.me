import React from "react";

import TextField from "@material-ui/core/TextField";

import Box from "@material-ui/core/Box";
import { KeyTypeToggleButton } from "./KeyTypeToggleButton";

export const MemeEditor = ({
  isLoading,
  memeText,
  selectedKeyType,
  handleKeyTypeChange,
  handleTextChange,
  handlePublish,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "16px" }}>
        <KeyTypeToggleButton
          value={selectedKeyType}
          onChange={handleKeyTypeChange}
        />
      </div>

      <Box display="flex">
        <Box p={1} width="100%">
          <TextField
            label="Text"
            value={memeText}
            fullWidth
            onChange={handleTextChange}
          />
        </Box>
      </Box>
    </div>
  );
};
