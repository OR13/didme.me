import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../../components/app-page";
import React from "react";
import { Box, TextField } from "@mui/material";

import { useRouter } from "next/router";
import { ResolutionResult } from "../../components/did-resolution-result";

const Resolve: NextPage = () => {
  const router = useRouter();
  const did = router.query.did as string;
  const title = did ? did.substr(0, 9) + "..." + did.substr(-4) : "unknown";
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Decentralized identifiers hidden in memes"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`https://didmeme.vercel.app/api/image/${did}`}
        />
      </Head>
      <AppPage>
        <div style={{ width: "100%", maxWidth: "640px" }}>
          <Box
            style={{
              marginTop: "64px",
              // textAlign: "center",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <TextField
              style={{ marginTop: "32px" }}
              label="DID"
              value={did || ""}
              fullWidth
              disabled={true}
            />
            <>
              <Box style={{ marginTop: "32px" }}>
                <ResolutionResult did={did} />
              </Box>
            </>
          </Box>
        </div>
      </AppPage>
    </>
  );
};

export default Resolve;
