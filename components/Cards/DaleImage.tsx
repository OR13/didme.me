import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function DaleImage({ index, image, onClick }: any) {
  return (
    <Card>
      <CardActionArea
        onClick={() => {
          onClick({ index, image });
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={"dalle generated image #" + index}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {"Dalle Image #" + index}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
