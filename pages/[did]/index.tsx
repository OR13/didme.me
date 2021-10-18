import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../../components/app-page";
import React from "react";
import { Box, TextField, Grid } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";

import InputAdornment from "@mui/material/InputAdornment";

import { ResolutionResult } from "../../components/did-resolution-result";
import LaunchIcon from "@mui/icons-material/Launch";

import MemoryIcon from "@mui/icons-material/Memory";
import { DIDAsTextField } from "../../components/did-as-textfield";
export async function getServerSideProps(context: any) {
  return {
    props: {
      did: context.params.did,
    }, // will be passed to the page component as props
  };
}

const Resolve: NextPage = (props: any) => {
  const router = useRouter();
  const did: any = props.did;
  const title = did ? did.substr(0, 9) + "..." + did.substr(-4) : "unknown";
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`https://didmeme.vercel.app/api/image/${did}`}
        />
      </Head>
      <AppPage>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "5vh" }}
        >
          <Grid item xs={3}>
            <div style={{ width: "100%", maxWidth: "640px" }}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <DIDAsTextField did={did} />
                <>
                  <Box style={{ marginTop: "32px" }}>
                    <ResolutionResult did={did} />
                  </Box>
                </>
              </Box>
            </div>
          </Grid>
        </Grid>
      </AppPage>
    </>
  );
};

export default Resolve;
