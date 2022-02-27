import React from "react";

import { AvatarSpinner } from "./avatar-spinner";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import _ from "lodash";
import BiotechIcon from "@mui/icons-material/Biotech";
import Chip from "@mui/material/Chip";
import GavelIcon from "@mui/icons-material/Gavel";

import { amber } from "@mui/material/colors";
import { DIDAsTextField } from "./did-as-textfield";
import Accordion from "./accordion";
import dynamic from "next/dynamic";
const JsonViewReadOnly = dynamic(() => import("./json-view-read-only"), {
  ssr: false,
});

export const CredentialPreview = ({ credential, verifyCredential }: any) => {
  const isJwt = typeof credential === "string";

  const [status, setStatus]: any = React.useState(null);
  const [issuer, setIssuer] = React.useState("");
  const [subject, setSubject] = React.useState("");

  let credentialContent = credential;
  if (isJwt) {
    const parsedJwtPayload = JSON.parse(
      Buffer.from(credential.split(".")[1], "base64").toString()
    );
    credentialContent = parsedJwtPayload.vc;
  }

  const handleVerifyMessage = React.useCallback(() => {
    setStatus("pending");
    setTimeout(async () => {
      try {
        const help = async (verifiableCredential: any) => {
          const res = await verifyCredential({
            verifiableCredential,
            format: isJwt ? "vc-jwt" : "vc",
          });

          return {
            verified: res.verified,
            issuer: isJwt
              ? credentialContent.issuer.id || credentialContent.issuer
              : verifiableCredential.issuer.id || verifiableCredential.issuer,
            subject: isJwt
              ? credentialContent.credentialSubject.id || "No Subject"
              : verifiableCredential.credentialSubject.id || "No Subject",
          };
        };
        const { verified, issuer, subject } = await help(credential);

        setIssuer(issuer);
        setSubject(subject);
        setStatus(verified ? "success" : "failure");
      } catch (e) {
        console.error(e);
        alert("verification failed.");
      }
    }, 1 * 1000);
  }, [
    isJwt,
    credentialContent,
    setStatus,
    setIssuer,
    setSubject,
    verifyCredential,
    credential,
  ]);

  React.useEffect(() => {
    if (status === null) {
      handleVerifyMessage();
    }
  }, [handleVerifyMessage, status]);

  function isValidHttpUrl(data: string) {
    let url;

    try {
      url = new URL(data);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  let contextToShow =
    credentialContent["@context"][credentialContent["@context"].length - 1];
  if (!isValidHttpUrl(contextToShow)) {
    contextToShow = credentialContent["@context"][0];
  }
  let typeToShow =
    credentialContent["type"][credentialContent["type"].length - 1];

  return (
    <>
      <AppBar position="relative" color={"transparent"}>
        <Toolbar sx={{ marginTop: "32px" }}>
          <AvatarSpinner status={status} />
          <div style={{ flexGrow: 1, marginLeft: "24px" }}>
            <Typography component="div">
              {credentialContent.name || _.startCase(typeToShow)}
            </Typography>
            <Link href={contextToShow} style={{ fontSize: ".8em" }}>
              {contextToShow}
            </Link>
          </div>
          <Button
            color="primary"
            variant={"outlined"}
            endIcon={<BiotechIcon />}
            onClick={handleVerifyMessage}
          >
            Verify
          </Button>
        </Toolbar>

        <div style={{ padding: "32px" }}>
          <Grid container spacing={2}>
            {isJwt && (
              <Grid item>
                <Chip
                  label="IANA Registry Compliant"
                  onClick={() => {
                    window.open(
                      "https://www.iana.org/assignments/jose/jose.xhtml"
                    );
                  }}
                  onDelete={() => {}}
                  deleteIcon={<GavelIcon style={{ color: amber["500"] }} />}
                />
              </Grid>
            )}

            {issuer && (
              <Grid item xs={12}>
                <DIDAsTextField label="Credential Issuer" did={issuer} />
              </Grid>
            )}

            {subject && subject !== "No Subject" && (
              <Grid item xs={12}>
                <DIDAsTextField label="Credential Subject" did={subject} />
              </Grid>
            )}

            <Grid item xs={12}>
              <Accordion
                title={"Details"}
                content={<JsonViewReadOnly value={credentialContent} />}
              />
            </Grid>
          </Grid>
        </div>
      </AppBar>
    </>
  );
};
