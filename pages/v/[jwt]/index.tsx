/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import AppPage from "../../../components/app-page";
import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";

import MessagePayloadPreview from "../../../components/message-payload-preview";

export async function getServerSideProps(context: any) {
  return {
    props: {
      jwt: context.params.jwt,
      //   recipient: getRecipient(context.params.message),
    }, // will be passed to the page component as props
  };
}

const Verify: NextPage = (props: any) => {
  const jwt: any = props.jwt;
  const title = "verify:..." + jwt.substr(-4);
  const parts = jwt.split(".");
  const { kid } = JSON.parse(Buffer.from(parts[0], "base64").toString());
  const issuerDid = kid.split("#")[0];

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`https://didmeme.vercel.app/api/image/${issuerDid}`}
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
                <MessagePayloadPreview payload={jwt} />
              </Box>
            </div>
          </Grid>
        </Grid>
      </AppPage>
    </>
  );
};

export default Verify;
