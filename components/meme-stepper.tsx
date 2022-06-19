import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { FileUploader } from "./file-uploader";
import { MemeCaption } from "./meme-caption";
import { generateDidMeme } from "../core/generateDidMeme";
import router from "next/router";

import { useEffect } from "react";

const fileToImageDataUrl = async (file: any) => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = async (e2: any) => {
      resolve(e2.target.result);
    };
    reader.readAsDataURL(file);
  });
};

export const MemeStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [image, setImage] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const [config, setConfig]: any = React.useState(null);

  const isStepSkipped = (step: any) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    if (activeStep + 1 >= steps.length) {
      setIsLoading(true);
      let result;
      try {
        result = await handleLastStep();
      } catch (e) {
        //
      }

      setIsLoading(false);
      return result;
    } else {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleAcceptedFiles = async (files: any) => {
    // const image: any = await fileToImageDataUrl(files[0]);
    // console.log(image);
    // setImage(image);
    setFile(files[0]);
    handleNext();
  };

  const isStepOptional = (step: any) => {
    return step === 2;
  };

  const handleLastStep = async () => {
    if (config) {
      const did = await generateDidMeme(config.key);
      router.push("/" + did);
    }
  };

  useEffect(() => {
    if (router.query.dalle) {
      const image = localStorage.getItem("dalle-image") as any;
      setImage(image);
      localStorage.removeItem("dalle-image");
      handleNext();
    }
  }, []);

  const steps = [
    {
      title: "Upload",
      content: (
        <div style={{ maxWidth: "512px" }}>
          <Paper sx={{ p: 4 }}>
            <div style={{ marginBottom: "32px" }}>
              <Typography variant={"h5"} gutterBottom>
                Add an image to get started
              </Typography>
              <Typography gutterBottom>
                Data will be published to the public IPFS network.
              </Typography>

              <Typography>
                DO NOT publish offensive content or data you do not own.
              </Typography>
            </div>
            <FileUploader onFilesAccepted={handleAcceptedFiles} />

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
        </div>
      ),
    },
    {
      title: "Publish",
      content: (
        <Paper sx={{ p: 4, mt: 2 }}>
          <MemeCaption file={file} setConfig={setConfig} />
        </Paper>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: "1024px" }}>
      <Grid container spacing={0} direction="column">
        <Grid item xs={12}>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {activeStep !== 0 && (
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Cancel
                  </Button>
                )}

                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

                {activeStep !== 0 && (
                  <Button
                    onClick={handleNext}
                    disabled={!file || isLoading}
                    variant={file ? "contained" : undefined}
                    color={file ? "secondary" : "primary"}
                  >
                    {activeStep === steps.length - 1 ? "Publish" : "Next"}
                  </Button>
                )}
              </Box>
              <>{steps[activeStep].content}</>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
