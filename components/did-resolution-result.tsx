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
} from "@mui/material";

import { useRouter } from "next/router";
import SendIcon from "@mui/icons-material/Send";
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
    <>
      <div>
        <Hidden smDown>
          <div style={{ wordBreak: "break-all" }}>
            <Link href={resolution.didDocumentMetadata.image}>
              {resolution.didDocumentMetadata.image}
            </Link>
          </div>
        </Hidden>

        <Link href={resolution.didDocumentMetadata.image}>
          <img
            src={resolution.didDocumentMetadata.image}
            alt="meme image"
            style={{ width: "100%", marginTop: "8px" }}
          />
        </Link>
        <div>
          <Button
            onClick={() => {
              router.push("/api/" + resolution.didDocument.id);
            }}
            variant="outlined"
            color={"secondary"}
            endIcon={<SourceIcon />}
          >
            View Source
          </Button>
          <Button
            style={{ marginLeft: "8px" }}
            onClick={() => {
              router.push("/e/" + resolution.didDocument.id);
            }}
            variant="contained"
            color={"secondary"}
            endIcon={<SendIcon />}
          >
            Encrypt
          </Button>
        </div>
      </div>
    </>
  );
};
