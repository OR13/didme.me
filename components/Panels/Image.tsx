/* eslint-disable @next/next/no-img-element */
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Box";
import Link from "@mui/material/Link";
import Hidden from "@mui/material/Hidden";

import {
  DIDSourceButton,
  RecentTweetsButton,
  ShareOnTwitterButton,
  ViewOnBitcoinButton,
  ViewOnEthereumButton,
  BackToDidMemeButton,
} from "../Buttons";

export const ImagePanel = ({ resolution }: any) => {
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

      <Stack
        spacing={2}
        direction="row"
        justifyContent={"center"}
        sx={{ mt: 2 }}
      >
        <DIDSourceButton resolution={resolution} />
        <RecentTweetsButton resolution={resolution} />
        <ShareOnTwitterButton resolution={resolution} />
        <ViewOnBitcoinButton resolution={resolution} />
        <ViewOnEthereumButton resolution={resolution} />
        <BackToDidMemeButton resolution={resolution} />
      </Stack>
    </Paper>
  );
};
