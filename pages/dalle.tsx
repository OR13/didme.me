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
  Box,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

import DaleImage from "../components/Cards/DaleImage";

const Dalle: NextPage = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState(
    "Cats using decentralized identifiers to buy bitcoin"
  );

  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState([]);

  const handleMint = async () => {
    setIsLoading(true);

    const response = await axios.post("/ai/dalle", { prompt });
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
                      Dalle Mini Image Generator
                    </Typography>

                    <Typography variant={"body1"}>
                      Learn more about Dalle by visiting{" "}
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
                      <br />
                      <br />
                      This service relies on a community hosted endpoint, which
                      is often under extreme load,{" "}
                      <Link
                        href="https://github.com/borisdayma/dalle-mini/issues/231"
                        target="_blank"
                      >
                        causing it to become unavailable.
                      </Link>
                      <br />
                      <br />
                      You may have better luck generating the images yourself
                      and then uploading them.
                      <br />
                      You can do that via this link:{" "}
                      <Link
                        href="https://huggingface.co/spaces/dalle-mini/dalle-mini"
                        target="_blank"
                      >
                        huggingface.co/spaces/dalle-mini/dalle-mini
                      </Link>
                    </Typography>
                  </>

                  <Box sx={{ width: "512px" }}>
                    <TextField
                      fullWidth
                      label={"Prompt"}
                      value={prompt}
                      onChange={(event: any) => {
                        setPrompt(event.target.value);
                      }}
                    />
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      onClick={handleMint}
                      disabled={isLoading}
                    >
                      Generate Images
                    </Button>
                  </Box>
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
                            localStorage.setItem("dalle-image", item.image);
                            router.push("/create?dalle=true");
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

export default Dalle;
