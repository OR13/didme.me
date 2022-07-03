import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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

declare var window: any;

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
  const [isImageReady, setIsImageReady]: any = useState(false);
  const [isCanvasReady, setIsCanvasReady]: any = useState(false);
  const [isLoading, setIsLoading]: any = useState(false);

  const handleFile = async (files: any[]) => {
    setIsImageReady(false);
    const [file] = files;
    const dataUrl = await readFileAsDataUrl(file);
    setImage(dataUrl);
    setIsImageReady(true);
  };

  const handlePublish = async () => {
    setIsLoading(true);
    window.handlePublishDidMeme();
    setTimeout(async () => {
      const didMeme = await DIDMeme.canvasToDidMeme("meme-canvas", config.key);
      router.push("/" + didMeme);
    }, 1 * 1000);
  };

  useEffect(() => {
    if (router.query.dalle) {
      const image: any = localStorage.getItem("dalle-image");
      if (image) {
        setImage(image);
        setIsImageReady(true);
      }
    }
  }, []);

  const handleCanvasReady = () => {
    setIsCanvasReady(true);
  };

  const handleCancel = () => {
    setIsCanvasReady(false);
    setIsImageReady(false);
    setConfig(null);
    setImage(null);
  };

  const isConfigReady = !!config;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isLoading && <LinearProgress color={"secondary"} sx={{ mb: 4 }} />}
      {image === null && (
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
      )}

      <Grid container spacing={2}>
        {isImageReady && isConfigReady && (
          <Grid item xs={12}>
            <Box sx={{ justifyContent: "space-between", display: "flex" }}>
              <Button disabled={isLoading} onClick={handleCancel}>
                Cancel
              </Button>
              {!!config && (
                <Button
                  color={"secondary"}
                  variant={"contained"}
                  onClick={handlePublish}
                  disabled={isLoading}
                  endIcon={<FingerprintIcon />}
                >
                  Publish
                </Button>
              )}
            </Box>
          </Grid>
        )}
        {isImageReady && (
          <>
            <Grid item xs={12} lg={8}>
              <CanvasEditor image={image} setCanvasReady={handleCanvasReady} />
            </Grid>
          </>
        )}

        {isCanvasReady && (
          <>
            <Grid item xs={12} lg={4}>
              {!config && <LinearProgress color={"secondary"} sx={{ mb: 4 }} />}
              <WalletCreator setConfig={setConfig} />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default DIDMemeCreator;
