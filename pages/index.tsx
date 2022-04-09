import type { NextPage } from "next";
import Head from "next/head";

import HomeAppBar from "../components/home-app-bar";

import { Theme } from "../components/theme";

import { ParticlesBlock } from "../components/particles-block";
import ExampleNFTs from "../components/home-page-nfts";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
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
      <Theme>
        <HomeAppBar>
          <ParticlesBlock sx={{ height: "400px" }}>
            <Box alignContent={"center"} justifyItems={"center"} sx={{ p: 3 }}>
              <Typography variant={"h2"}>DID MEME</Typography>
              <Typography variant={"h5"} sx={{ mb: 4 }}>
                Steganographic Decentralized Identifiers using IPFS.
              </Typography>
              <Button
                variant={"contained"}
                color={"primary"}
                onClick={() => {
                  router.push("/create");
                }}
              >
                Get Started
              </Button>
            </Box>
          </ParticlesBlock>
          <ExampleNFTs />
        </HomeAppBar>
      </Theme>
    </>
  );
};

export default Home;
