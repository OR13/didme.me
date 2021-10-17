import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../components/app-page";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>didmeme</title>
        <meta
          name="description"
          content="Decentralized identifiers hidden in memes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppPage>
        <Box
          style={{
            marginTop: "64px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Typography variant={"h5"} style={{ marginTop: "16px" }}>
            Powered By
          </Typography>
          <Grid
            container
            spacing={8}
            style={{ maxWidth: "512px", margin: "auto", marginTop: "8px" }}
          >
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
        </Box>
      </AppPage>
    </>
  );
};

export default About;
