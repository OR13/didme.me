/* eslint-disable @next/next/no-img-element */
import React from "react";

import axios from "axios";
import { CircularProgress, Typography, Link, Hidden, Box } from "@mui/material";

export const DIDAsImage = ({ did }: any) => {
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
      <Box style={{ display: "flex", flexGrow: 1, flexDirection: "row" }}>
        <CircularProgress />
        <Typography style={{ marginLeft: "16px", marginTop: "8px" }}>
          Resolving DID... due to IPFS being decentralized this may take
          minutes.
        </Typography>
      </Box>
    );
  }

  if (!resolution) {
    return <div>Resolution failed for {did}</div>;
  }

  return (
    <img
      src={resolution.didDocumentMetadata.image}
      alt="meme image"
      style={{ width: "100%", marginTop: "8px" }}
    />
  );
};
