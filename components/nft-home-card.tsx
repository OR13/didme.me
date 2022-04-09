import * as React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

export default function NftCard({ did }: any) {
  const router = useRouter();
  return (
    <Card sx={{ maxWidth: 480 }}>
      <CardActionArea
        onClick={() => {
          router.push("/" + did);
        }}
      >
        <CardMedia
          component="img"
          image={`https://didme.me/api/image/${did}`}
          alt="did meme"
          style={{ height: 280, objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {did.substr(0, 32) + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
