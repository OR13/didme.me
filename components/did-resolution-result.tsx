/* eslint-disable @next/next/no-img-element */
import React from "react";

import axios from "axios";
import { CircularProgress, Typography, Link, Hidden } from "@mui/material";
import { ResolutionTabs } from "./did-resolution-tabs";

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
      <div>
        <CircularProgress />
        <Typography style={{ marginTop: "16px" }}>
          Resolving DID... due to IPFS being decentralized this may take
          minutes.
        </Typography>
      </div>
    );
  }

  if (!resolution) {
    return <div>Resolution failed for {did}</div>;
  }

  return (
    <>
      <ResolutionTabs
        image={
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
          </div>
        }
        didDocument={
          <pre
            style={{
              textAlign: "left",
              wordBreak: "break-all",
              width: "100%",
              fontSize: "10px",
            }}
          >
            {JSON.stringify(resolution.didDocument, null, 2)}
          </pre>
        }
      />
    </>
  );
};
