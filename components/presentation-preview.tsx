import React from "react";

import { AvatarSpinner } from "./avatar-spinner";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import _ from "lodash";
import Grid from "@mui/material/Grid";
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

export const PresentationPreview = ({
  presentation,
  verifyPresentation,
}: any) => {
  const isJwt = typeof presentation === "string";
  const [status, setStatus]: any = React.useState(null);
  const [holder, setHolder] = React.useState("");

  let presentationContent = presentation;
  let parsedJwtPayload: any;
  if (isJwt) {
    parsedJwtPayload = JSON.parse(
      Buffer.from(presentation.split(".")[1], "base64").toString()
    );
    presentationContent = parsedJwtPayload.vp;
  }

  const handleVerifyMessage = React.useCallback(() => {
    setStatus("pending");
    setTimeout(async () => {
      try {
        const help = async (verifiablePresentation: any) => {
          const res = await verifyPresentation({
            verifiablePresentation,
            format: isJwt ? "vp-jwt" : "vp",
            options: {
              challenge: isJwt
                ? parsedJwtPayload.nonce
                : verifiablePresentation.proof.challenge,
              domain: isJwt
                ? parsedJwtPayload.aud
                : verifiablePresentation.proof.domain,
            },
          });
          return {
            verified: res.verified,
            holder: isJwt
              ? presentationContent.holder.id || presentationContent.holder
              : verifiablePresentation.holder.id ||
                verifiablePresentation.holder,
          };
        };
        const { verified, holder } = await help(presentation);

        setHolder(holder);
        setStatus(verified ? "success" : "failure");
      } catch (e) {
        console.error(e);
        alert("verification failed.");
      }
    }, 1 * 1000);
  }, [
    isJwt,
    presentationContent,
    parsedJwtPayload,
    setStatus,
    setHolder,
    verifyPresentation,
    presentation,
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
    presentationContent["@context"][presentationContent["@context"].length - 1];
  if (!isValidHttpUrl(contextToShow)) {
    contextToShow = presentationContent["@context"][0];
  }
  let typeToShow =
    presentationContent["type"][presentationContent["type"].length - 1];

  return (
    <>
      <AppBar position="relative" color={"transparent"}>
        <Toolbar sx={{ marginTop: "32px" }}>
          <AvatarSpinner status={status} />
          <div style={{ flexGrow: 1, marginLeft: "24px" }}>
            <Typography component="div">
              {presentation.name || typeToShow}
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
            {holder && (
              <Grid item xs={12}>
                <DIDAsTextField label="Presentation Holder" did={holder} />
              </Grid>
            )}

            <Grid item xs={12}>
              <Accordion
                title={"Details"}
                content={<JsonViewReadOnly value={presentationContent} />}
              />
            </Grid>
          </Grid>
        </div>
      </AppBar>
    </>
  );
};
