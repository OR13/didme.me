import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import HttpIcon from "@material-ui/icons/Http";
import CodeIcon from "@material-ui/icons/Code";
import GavelIcon from "@material-ui/icons/Gavel";
import BuildIcon from "@material-ui/icons/Build";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import YouTubeIcon from "@material-ui/icons/YouTube";
import history from "../../store/history";

export default function DrawerContent() {
  return (
    <List>
      <ListItem
        button
        onClick={() => {
          history.push("/");
        }}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary={"Home"} />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          window.open("https://github.com/OR13/did.meme.ai");
        }}
      >
        <ListItemIcon>
          <CodeIcon />
        </ListItemIcon>
        <ListItemText primary={"Code"} />
      </ListItem>
    </List>
  );
}
