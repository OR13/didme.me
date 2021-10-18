/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = [
  {
    label: "localhost",
    url: "http://localhost:8080",
    logo: "/favicon.ico",
  },
  {
    label: "ipfs.io",
    url: "https://ipfs.io",
    logo: "/ipfs.png",
  },
  {
    label: "infura.io",
    url: "https://ipfs.infura.io",
    logo: "/infura.svg",
  },
];

export const GateWaySelect = () => {
  const [selected, select] = React.useState(options[0]);

  const handleChange = (_event: any, data: any) => {
    const { url } = data;
    localStorage.setItem("ipfs.gateway", url);
    const opt: any = options.find((o) => {
      return o.url === url;
    });
    select(opt);
  };

  React.useEffect(() => {
    const defaultOption: any = options.find((o) => {
      return o.url === localStorage.getItem("ipfs.gateway");
    });
    select(defaultOption);
  }, [select]);

  return (
    <Autocomplete
      sx={{ marginTop: "32px" }}
      options={options}
      value={selected}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {/* <img loading="lazy" width="64" src={option.logo} alt="" /> */}
          {option.label}
        </Box>
      )}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose an ipfs gateway"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
