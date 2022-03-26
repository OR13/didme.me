import type { NextPage } from "next";
import Head from "next/head";

import React from "react";
import { Box, TextField } from "@mui/material";

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";

import { useRouter } from "next/router";

import { GateWaySelect } from "../components/gateway-select";

import AppPage from "../components/app-page";

const Resolve: NextPage = () => {
  const router = useRouter();
  const [did, setDid] = React.useState(
    "did:meme:1zgsqltm43euwf6rhs2gf2gp9hp879j47hua2sy5l2lv26vu44r2es2gcjlk7j"
  );

  const handleResolve = () => {
    router.push("/" + did);
  };

  return (
    <>
      <Head>
        <title>did:meme</title>
        <meta
          name="description"
          content="Decentralized identifiers hidden in memes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppPage>
        <Box sx={{ maxWidth: "720px" }}>
          <TextField
            style={{ marginTop: "32px" }}
            label="DID"
            multiline
            value={did}
            fullWidth
            onChange={(event: any) => {
              setDid(event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Resolve DID"
                    onClick={handleResolve}
                    color={"primary"}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <GateWaySelect />
        </Box>
      </AppPage>
    </>
  );
};

export default Resolve;