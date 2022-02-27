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
    <Paper sx={{ p: 4 }}>
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
            color={"secondary"}
            endIcon={<SourceIcon />}
          >
            DID Source
          </Button>

          <Button
            onClick={() => {
              const keywords = ["#swift", "#eth"];
              const encodedQuery = keywords
                .map(encodeURIComponent)
                .join("%20%2B%20");
              const url = `https://twitter.com/search?q=${encodedQuery}&src=typed_query`;
              window.open(url);
            }}
            variant="outlined"
            color={"secondary"}
            endIcon={<SourceIcon />}
          >
            Recent Tweets
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
