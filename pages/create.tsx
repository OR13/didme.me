import type { NextPage } from "next";
import Head from "next/head";

import AppPage from "../components/app-page";

import dynamic from "next/dynamic";

const DIDMemeCreator = dynamic(() => import("../components/DIDMemeCreator"), {
  ssr: false,
});

const Create: NextPage = () => {
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
        <DIDMemeCreator />
      </AppPage>
    </>
  );
};

export default Create;
