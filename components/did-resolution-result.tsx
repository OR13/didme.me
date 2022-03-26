/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  Link,
  Hidden,
  Box,
  Button,
  Stack,
  Paper,
} from "@mui/material";

import { useRouter } from "next/router";
import SourceIcon from "@mui/icons-material/Source";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import ExportPanel from "./export-panel";
import { colors } from "@mui/material";

import Meta from "./meta";
declare var window: any;
export const ResolutionResult = ({ did }: any) => {
  const router = useRouter();
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
  if (loading) {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Typography>Resolving from IPFS... this may take minutes.</Typography>
        </Box>
      </>
    );
  }

  if (!resolution) {
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Typography>Resolution failed for: {did}</Typography>
        </Box>
      </>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link href={resolution.didDocumentMetadata.image}>
          <img
            src={resolution.didDocumentMetadata.image}
            alt="meme image"
            style={{ width: "100%", maxWidth: "720px", marginTop: "8px" }}
          />
        </Link>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Hidden smDown>
          <div
            style={{
              wordBreak: "break-all",
              marginTop: "16px",

              fontSize: "0.8em",
            }}
          >
            <Link href={resolution.didDocumentMetadata.image}>
              {resolution.didDocumentMetadata.image}
            </Link>
          </div>
        </Hidden>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Stack spacing={2} direction="row" justifyContent={"center"}>
          <Button
            onClick={() => {
              router.push("/api/" + resolution.didDocument.id);
            }}
            variant="outlined"
            endIcon={<SourceIcon />}
          >
            DID Source
          </Button>

          <Button
            onClick={() => {
              const did = resolution.didDocument.id;
              const id = did.split("did:meme:").pop();
              const keywords = ["#did:meme", "#" + id];
              const encodedQuery = keywords
                .map(encodeURIComponent)
                .join("%20%2B%20");
              const url = `https://twitter.com/search?q=${encodedQuery}&src=typed_query`;
              window.open(url);
            }}
            variant="outlined"
            endIcon={<TwitterIcon />}
          >
            Recent Tweets
          </Button>

          {resolution.didDocumentMetadata.ethereum && (
            <Button
              onClick={() => {
                const url = `https://ropsten.etherscan.io/address/${resolution.didDocumentMetadata.ethereum.address}`;
                window.open(url);
              }}
              variant="outlined"
              color={"secondary"}
              endIcon={<MonetizationOnIcon />}
            >
              Ethereum Activity
            </Button>
          )}
        </Stack>
      </Box>

      {window.ethereum && resolution.didDocumentMetadata.ethereum && (
        <>
          <Paper sx={{ mt: 4, p: 4, bgcolor: colors.grey["900"] }}>
            <Meta resolution={resolution} />
          </Paper>
        </>
      )}

      {!window.ethereum && resolution.didDocumentMetadata.ethereum && (
        <>
          <Paper sx={{ mt: 4, p: 4, bgcolor: colors.grey["800"] }}>
            <Typography sx={{ mb: 2 }} variant={"h6"}>
              Install MetaMask to unlock experimental features.
            </Typography>

            <Button
              onClick={() => {
                const url = `https://docs.metamask.io/guide/`;
                window.open(url);
              }}
              variant="outlined"
              color={"secondary"}
              endIcon={<ExtensionRoundedIcon />}
            >
              Get Started
            </Button>
          </Paper>
        </>
      )}
      <ExportPanel />
    </Box>
  );
};