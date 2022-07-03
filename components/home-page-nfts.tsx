import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import NftCard from "./nft-home-card";

function Item(props: any) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <NftCard {...props} />
    </Box>
  );
}

export default function Example(props: any) {
  const [items, setItems]: any = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const res = await axios.get("/api/nft/summary");
      const resultData = res.data as any;
      setItems(resultData.items);
    })();
  }, []);

  if (items === null) {
    return (
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 1, ml: 1 }}>Loading NFTs...</Typography>
      </Box>
    );
  }

  return (
    <Carousel
      navButtonsAlwaysVisible={true}
      indicatorContainerProps={{
        style: { marginTop: "32px", marginBottom: "64px" },
      }}
    >
      {items.map((item: any, i: number) => (
        <Item key={i} {...item} />
      ))}
    </Carousel>
  );
}
