import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../components/app-page";
import { MemeStepper } from "../components/meme-stepper";

const Home: NextPage = () => {
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
        <MemeStepper />
      </AppPage>
    </>
  );
};

export default Home;
