/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../../../components/app-page";
import React from "react";
import { TextField, Grid } from "@mui/material";
import { CircularProgress, Typography, Link, Hidden, Box } from "@mui/material";

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";

import SendIcon from "@mui/icons-material/Send";

import { encryptTo } from "../../../io/encrypt";

import axios from "axios";
import { useRouter } from "next/router";
import { DIDAsTextField } from "../../../components/did-as-textfield";

export async function getServerSideProps(context: any) {
  return {
    props: {
      did: context.params.did,
    }, // will be passed to the page component as props
  };
}

const Wall: NextPage = (props: any) => {
  const router = useRouter();
  const did: any = props.did;
  const title = did ? did.substr(0, 9) + "..." + did.substr(-4) : "unknown";
  const [message, setMessage] = React.useState(
    "the quieter you become the more you are able to hear"
  );

  const [loading, setLoading] = React.useState(true);
  const [resolution, setResolution]: any = React.useState(null);
  React.useEffect(() => {
    if (did) {
      (async () => {
        const res = await axios.get(window.location.origin + "/" + did, {
          headers: {
            accept: "application/did+json",
          },
        });

        const resultData = res.data as any;
        const localGateWay: any = localStorage.getItem("ipfs.gateway");
        if (localGateWay) {
          const hash = resultData.didDocumentMetadata.image.split("/").pop();
          resultData.didDocumentMetadata.image = localGateWay + "/ipfs/" + hash;
        }
        setResolution(resultData);
        setLoading(false);
      })();
    }
  }, [did]);

  const handleSendMessage = async () => {
    const jwe = await encryptTo(resolution.didDocument, { message });

    router.push("/d/" + jwe);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`https://didmeme.vercel.app/api/image/${did}`}
        />
      </Head>
      <AppPage>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "5vh" }}
        >
          <Grid item xs={3}>
            <div style={{ width: "100%", maxWidth: "640px" }}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                {!resolution && (
                  <>
                    <Box
                      style={{
                        display: "flex",
                        flexGrow: 1,
                        flexDirection: "row",
                      }}
                    >
                      <CircularProgress />
                      <Typography
                        style={{ marginLeft: "16px", marginTop: "8px" }}
                      >
                        Resolving DID... due to IPFS being decentralized this
                        may take minutes.
                      </Typography>
                    </Box>
                  </>
                )}
                {resolution && (
                  <>
                    <Box style={{ marginTop: "32px", marginBottom: "32px" }}>
                      {/* <ResolutionResult did={did} /> */}
                      <img
                        src={resolution.didDocumentMetadata.image}
                        alt="meme image"
                        style={{ width: "100%", marginTop: "8px" }}
                      />

                      <DIDAsTextField
                        did={resolution.didDocument.id}
                        label="Message Recipient"
                        style={{ marginTop: "16px" }}
                      />
                    </Box>

                    <TextField
                      label="Message Content"
                      multiline
                      value={message}
                      onChange={(event) => {
                        setMessage(event.target.value);
                      }}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="encrypt message"
                              onClick={handleSendMessage}
                            >
                              <SendIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                )}
              </Box>
            </div>
          </Grid>
        </Grid>
      </AppPage>
    </>
  );
};

export default Wall;
