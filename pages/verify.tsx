import type { NextPage } from "next";
import Head from "next/head";
import AppPage from "../components/app-page";
import React from "react";
import { Box } from "@mui/material";

import dynamic from "next/dynamic";
const JsonVerifier = dynamic(() => import("../components/json-verifier"), {
  ssr: false,
});

const example =
  "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDptZW1lOjF6Z3NkYTRjbmthMnZxOTB3dDV5NmtsOXk2djRyaHh3NjR6cTU1NnFwM3Z0M204d3dobTIwaG5xY2NlY2hhI3o2TWt0aVN6cUY5a3F3ZFU4VmtkQkt4NTZFWXpYZnBnbk5QVUFHem5waWNOaVdmbiJ9.eyJpc3MiOiJkaWQ6bWVtZToxemdzZGE0Y25rYTJ2cTkwd3Q1eTZrbDl5NnY0cmh4dzY0enE1NTZxcDN2dDNtOHd3aG0yMGhucWNjZWNoYSIsInN1YiI6ImRpZDpleGFtcGxlOjEyMyIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sImlkIjoidXJuOnV1aWQ6MDdhYTk2OWUtYjQwZC00YzFiLWFiNDYtZGVkMjUyMDAzZGVkIiwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJpc3N1ZXIiOiJkaWQ6bWVtZToxemdzZGE0Y25rYTJ2cTkwd3Q1eTZrbDl5NnY0cmh4dzY0enE1NTZxcDN2dDNtOHd3aG0yMGhucWNjZWNoYSIsImlzc3VhbmNlRGF0ZSI6IjIwMTAtMDEtMDFUMTk6MjM6MjRaIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6ZXhhbXBsZToxMjMifX0sImp0aSI6InVybjp1dWlkOjA3YWE5NjllLWI0MGQtNGMxYi1hYjQ2LWRlZDI1MjAwM2RlZCIsIm5iZiI6MTI2MjM3MzgwNH0.ahtNm8wUpTIIMR75Wp8xZiDxZ57-rlOeGZIY1rv-bVc2TaH7eowK6uIWhuAYoCTTh2DvPzny6aJuJxtwcx7TAw";
const Verify: NextPage = () => {
  return (
    <>
      <Head>
        <title>did actor</title>
        <meta name="description" content="Decentralized identifiers api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppPage>
        {" "}
        <Box
          style={{
            marginTop: "64px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <JsonVerifier value={example} />
        </Box>
      </AppPage>
    </>
  );
};

export default Verify;
