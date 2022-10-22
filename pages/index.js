import Head from "next/head";
import AppPage from "../components/AppPage";
import { Box } from "@mui/material";

import { useEffect, useState } from "react";
import meta from "../services/social";

export default function Home() {
 
  return (
    <>
      <Head>
        <title>Transmute</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content={meta.domain} />
        <meta name="twitter:url" content={meta.url} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>

      <AppPage title={meta.title}>
        <Box sx={{ p: 1 }}>
         
          <Box
            sx={{ mt: 2 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
           
          </Box>
        </Box>
      </AppPage>
    </>
  );
}