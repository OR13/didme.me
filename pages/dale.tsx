/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";

import AppPage from "../components/app-page";

import {
  Typography,
  TextField,
  Button,
  LinearProgress,
  Stack,
  Grid,
  Link,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

import DaleImage from "../components/Cards/DaleImage";

const Dale: NextPage = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState(
    "Cats using decentralized identifiers to buy bitcoin"
  );

  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState([]);

  const handleMint = async () => {
    setIsLoading(true);

    const response = await axios.post("/ai/dale", { prompt });
    const { images } = response.data as any;

    setImages(images);
    setIsLoading(false);
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
        {isLoading ? (
          <>
            <LinearProgress />
            <Typography sx={{ mt: 2 }} variant={"h6"}>
              It may take several minutes to generate images...
            </Typography>
          </>
        ) : (
          <>
            {images.length === 0 ? (
              <>
                {" "}
                <Stack spacing={4}>
                  <>
                    <Typography sx={{ mt: 2 }} variant={"h4"}>
                      Dale Image Generator
                    </Typography>

                    <Typography sx={{ mt: 1 }} variant={"body1"}>
                      Learn more about Dale by visiting{" "}
                      <Link
                        href="https://huggingface.co/spaces/dalle-mini/dalle-mini"
                        target="_blank"
                      >
                        huggingface.co
                      </Link>{" "}
                      or{" "}
                      <Link href="https://openai.com" target="_blank">
                        openai.com
                      </Link>
                      .
                    </Typography>
                  </>

                  <TextField
                    label={"Prompt"}
                    value={prompt}
                    onChange={(event: any) => {
                      setPrompt(event.target.value);
                    }}
                  />

                  <Button
                    variant="contained"
                    onClick={handleMint}
                    disabled={isLoading}
                  >
                    Generate Images
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Typography variant={"h5"} sx={{ mb: 2 }}>
                  Choose an image to convert to a DID Meme.
                </Typography>
                <Grid container spacing={2}>
                  {images.map((image, index) => {
                    return (
                      <Grid item key={index}>
                        <DaleImage
                          index={index}
                          image={image}
                          onClick={(item: any) => {
                            localStorage.setItem("dale-image", item.image);
                            router.push("/create?dale=true");
                          }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
          </>
        )}
      </AppPage>
    </>
  );
};

export default Dale;
