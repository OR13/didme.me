import React from "react";
import { TextField } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";

import InputAdornment from "@mui/material/InputAdornment";

import LaunchIcon from "@mui/icons-material/Launch";

export const DIDAsTextField = ({ did, onChange, label, style }: any) => {
  const router = useRouter();
  return (
    <TextField
      label={label || "DID"}
      style={style}
      value={did || ""}
      fullWidth
      disabled={!onChange}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="resolve did"
              onClick={() => {
                router.push("/" + did);
              }}
            >
              <LaunchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
