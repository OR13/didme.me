import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";

import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CodeIcon from "@mui/icons-material/Code";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ApiIcon from "@mui/icons-material/Api";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import { useRouter } from "next/router";

const drawerWidth = 240;

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AppPage({ title, children }: any) {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color={"secondary"}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/");
            }}
          >
            {title || "did:meme"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              router.push("/");
            }}
          >
            <ListItemIcon>
              <AddPhotoAlternateIcon />
            </ListItemIcon>
            <ListItemText primary={"Create"} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              router.push("/resolve");
            }}
          >
            <ListItemIcon>
              <ImageSearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Resolve"} />
          </ListItem>

          <ListItem
            button
            onClick={() => {
              router.push("/docs");
            }}
          >
            <ListItemIcon>
              <ApiIcon />
            </ListItemIcon>
            <ListItemText primary={"API"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              router.push("/about");
            }}
          >
            <ListItemIcon>
              <ReadMoreIcon />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>

          <ListItem
            button
            onClick={() => {
              window.open("https://github.com/OR13/didme.me");
            }}
          >
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText primary={"Source"} />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: "1024px" }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
