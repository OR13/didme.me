import type { NextPage } from "next";
import Head from "next/head";

import React from "react";

import { ResolutionResult } from "../../components/did-resolution-result";

import AppPage from "../../components/app-page";

import * as didWeb from "../../core/didWebConverter";

export async function getServerSideProps(context: any) {
  return {
    props: {
      did: context.params.did,
    }, // will be passed to the page component as props
  };
}

const Resolve: NextPage = (props: any) => {
  const did: any = props.did;
  const title = did ? did.substr(0, 16) + "..." + did.substr(-16) : "unknown";

  let didImage = did;
  if (did.startsWith("did:web")) {
    didImage = didWeb.didMeme(did);
  }

  const url = `https://didme.me/${did}`;
  const image = `https://didme.me/api/image/${didImage}`;
  const description = `Decentralized Identifier powered by IPFS and Steganography`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content="didme.me" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
      <AppPage>
        <ResolutionResult did={did} />
      </AppPage>
    </>
  );
};

export default Resolve;
