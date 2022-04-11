/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import { CircularProgress, Typography, Box } from "@mui/material";

import VerticalTabs from "./did-resolution-panels";

import { useRouter } from "next/router";

declare var window: any;
export const ResolutionResult = ({ did }: any) => {
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
          {did.startsWith("did:web") ? (
            <>
              {" "}
              <Typography>Resolving from Web</Typography>
            </>
          ) : (
            <>
              {" "}
              <Typography>
                Resolving from IPFS... this may take minutes.
              </Typography>
            </>
          )}
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

  return <VerticalTabs resolution={resolution} />;
};
