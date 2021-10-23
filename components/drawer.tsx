import * as React from "react";

import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

import CodeIcon from "@mui/icons-material/Code";
import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import SearchIcon from "@mui/icons-material/Search";
import ApiIcon from "@mui/icons-material/Api";

import { useRouter } from "next/router";

export const Drawer = () => {
  const router = useRouter();

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem
          button
          selected={router.pathname === "/"}
          onClick={() => {
            router.push("/");
          }}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Create"} />
        </ListItem>
        <ListItem
          button
          selected={
            router.pathname === "/resolve" ||
            router.pathname.startsWith("/[did]")
          }
          onClick={() => {
            router.push("/resolve");
          }}
        >
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary={"Resolve"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          selected={router.pathname === "/about"}
          onClick={() => {
            router.push("/about");
          }}
        >
          <ListItemIcon>
            <InfoOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"About"} />
        </ListItem>
        <ListItem
          button
          component={Link}
          href="https://github.com/OR13/didme.me"
        >
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary={"Source"} />
        </ListItem>
        <ListItem button component={Link} href="/docs">
          <ListItemIcon>
            <ApiIcon />
          </ListItemIcon>
          <ListItemText primary={"API"} />
        </ListItem>
      </List>
    </div>
  );
};
