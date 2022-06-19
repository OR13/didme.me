import dynamic from "next/dynamic";
import { useState } from "react";

import { FileUploader } from "../components/file-uploader";

import {
  Grid,
  Box,
  Button,
  Typography,
  Paper,
  LinearProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

import DIDMeme from "../core/DIDMeme";

const CanvasEditor = dynamic(() => import("../components/CanvasEditor"), {
  ssr: false,
});

const WalletCreator = dynamic(() => import("../components/WalletCreator"), {
  ssr: false,
});

const readFileAsDataUrl = async (file: any): Promise<any> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (event: any) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
};

const DIDMemeCreator = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [config, setConfig]: any = useState(null);
  const [isLoading, setIsLoading]: any = useState(false);

  const handleFile = async (files: any[]) => {
    setIsLoading(true);
    const [file] = files;
    const dataUrl = await readFileAsDataUrl(file);
    setImage(dataUrl);
    setIsLoading(false);
  };

  const handlePublish = async () => {
    setIsLoading(true);
    const [el]: any = document.getElementsByClassName("lower-canvas");
    el.setAttribute("id", "meme-canvas");
    const didMeme = await DIDMeme.canvasToDidMeme("meme-canvas", config.key);
    router.push("/" + didMeme);
  };

  return (
    <>
      {isLoading && <LinearProgress color={"secondary"} sx={{ mb: 4 }} />}
      {image === null ? (
        <>
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant={"h4"} gutterBottom>
              Add an image to get started
            </Typography>
            <Typography gutterBottom>
              Data will be published to the public IPFS network.
            </Typography>

            <Typography>
              DO NOT publish offensive content or data you do not own.
            </Typography>

            <Box sx={{ maxWidth: "512px", margin: "auto", mt: 4 }}>
              <FileUploader onFilesAccepted={handleFile} />
            </Box>

            <Typography sx={{ mt: 4, mb: 2 }}>
              Or use AI to generate an image from text...
            </Typography>
            <Button
              variant="outlined"
              color={"secondary"}
              onClick={() => {
                router.push("/dalle");
              }}
            >
              Try Dalle Mini
            </Button>
          </Paper>
        </>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ justifyContent: "space-between", display: "flex" }}>
              <Button
                onClick={() => {
                  setImage(null);
                }}
              >
                Cancel
              </Button>
              <Button
                color={"secondary"}
                variant={"contained"}
                onClick={handlePublish}
                disabled={isLoading}
                endIcon={<FingerprintIcon />}
              >
                Publish
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CanvasEditor image={image} />
          </Grid>
          <Grid item xs={12} lg={6}>
            {config === null && <LinearProgress color={"secondary"} />}
            <WalletCreator setConfig={setConfig} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default DIDMemeCreator;
