import type { NextPage } from "next";
import Head from "next/head";

import React from "react";
import { Box } from "@mui/material";

import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import { defaultIssuer } from "../core/defaultMnemonic";

import AppPage from "../components/app-page";

const JsonCredentialIssuer = dynamic(
  () => import("../components/json-credential-issuer"),
  {
    ssr: false,
  }
);

const Issue: NextPage = () => {
  const router = useRouter();
  const example = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    id: "urn:uuid:07aa969e-b40d-4c1b-ab46-ded252003ded",
    type: ["VerifiableCredential"],
    issuer: defaultIssuer,
    issuanceDate: "2010-01-01T19:23:24Z",
    credentialSubject: { id: router.query.subject || "did:example:123" },
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
          <JsonCredentialIssuer value={example} />
        </Box>
      </AppPage>
    </>
  );
};

export default Issue;
