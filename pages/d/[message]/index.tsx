/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../../../components/app-page";
import React from "react";
import { TextField, Grid } from "@mui/material";
import { Box } from "@mui/material";

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";

import { decryptWith, getRecipient } from "../../../io/decrypt";
import { DIDAsImage } from "../../../components/did-as-image";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { DIDAsTextField } from "../../../components/did-as-textfield";

import { defaultMnemonic } from "../../../core/defaultMnemonic";
export async function getServerSideProps(context: any) {
  return {
    props: {
      message: context.params.message,
      recipient: getRecipient(context.params.message),
    }, // will be passed to the page component as props
  };
}

const Wall: NextPage = (props: any) => {
  const message: any = props.message;
  const recipient: any = props.recipient;
  const title = "decrypt:..." + message.substr(-4);

  const handleDecryptMessage = async () => {
    try {
      const plaintext = await decryptWith(message, mnemonic);
      setPlaintext(plaintext.message);
    } catch (e) {
      alert("decryption failed.");
    }
  };

  const [plaintext, setPlaintext] = React.useState("");

  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`https://didmeme.vercel.app/api/image/${recipient.controller}`}
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
                {recipient && (
                  <div>
                    <DIDAsImage did={recipient.controller} />
                    <DIDAsTextField
                      label="Message Recipient"
                      did={recipient.controller}
                      style={{ marginTop: "32px" }}
                    />

                    <TextField
                      label="Mnemonic for Recipient"
                      multiline
                      value={mnemonic}
                      onChange={(event) => {
                        setMnemonic(event.target.value);
                      }}
                      style={{ marginBottom: "32px", marginTop: "32px" }}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="decrypt message"
                              onClick={handleDecryptMessage}
                            >
                              <LockOpenIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                )}

                {plaintext && (
                  <TextField
                    label="Decrypted Message Content"
                    multiline
                    value={plaintext}
                    fullWidth
                    disabled={true}
                  />
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
