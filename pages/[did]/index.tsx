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
  const title = did ? did.substr(0, 9) + "..." + did.substr(-4) : "unknown";

  let didImage = did;
  if (did.startsWith("did:web")) {
    didImage = didWeb.didMeme(did);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`https://didmeme.vercel.app/api/image/${didImage}`}
        />
      </Head>
      <AppPage>
        <ResolutionResult did={did} />
      </AppPage>
    </>
  );
};

export default Resolve;
