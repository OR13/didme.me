import type { NextPage } from "next";
import Head from "next/head";

import { Typography, Grid, Paper, Link } from "@mui/material";
import Image from "next/image";
import AppPage from "../components/app-page";
import { ParticlesBlock } from "../components/particles-block";
const About: NextPage = () => {
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
        <Paper sx={{ bgcolor: "#fff", p: 4 }}>
          <div style={{ width: "100%", padding: "8px" }}>
            <Typography variant={"h5"} color={"primary"} sx={{ mb: 2 }}>
              DID Meme is powered...
            </Typography>
          </div>
          <Grid container spacing={8}>
            <Grid item>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={128}
                  height={51}
                />
              </a>
            </Grid>
            <Grid item>
              <a
                href="https://ipfs.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/ipfs.png"
                  alt="IPFS Logo"
                  width={128}
                  height={51}
                />
              </a>
            </Grid>
            <Grid item>
              <a
                href="https://infura.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/infura.svg"
                  alt="Infura Logo"
                  width={128}
                  height={51}
                />
              </a>
            </Grid>

            <Grid item>
              <a
                href="https://metamask.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/metamask.svg"
                  alt="MetaMask Logo"
                  width={160}
                  height={51}
                />
              </a>
            </Grid>

            <Grid item>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/twitter.png"
                  alt="Twitter Logo"
                  width={160}
                  height={60}
                />
              </a>
            </Grid>

            <Grid item>
              <a
                href="https://etherscan.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/etherscan.svg"
                  alt="Etherscan Logo"
                  width={160}
                  height={51}
                />
              </a>
            </Grid>

            <Grid item>
              <a
                href="https://mui.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/mui.svg"
                  alt="Material UI Logo"
                  width={128}
                  height={51}
                />
              </a>
            </Grid>
            <Grid item>
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/next.svg"
                  alt="Next.js Logo"
                  width={128}
                  height={51}
                />
              </a>
            </Grid>

            <Grid item>
              <a
                href="https://did.key.transmute.industries"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/transmute.svg"
                  alt="Transmute Logo"
                  width={128}
                  height={51}
                />
              </a>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ width: "100%", mt: 2 }}>
          <ParticlesBlock sx={{ height: "256px", width: "100%" }}>
            <div style={{ width: "100%", padding: "8px" }}>
              And of course...{" "}
              <Link
                href="https://vincentgarreau.com/particles.js/"
                color={"secondary"}
              >
                particles.js
              </Link>
            </div>
          </ParticlesBlock>
        </Paper>
      </AppPage>
    </>
  );
};

export default About;
