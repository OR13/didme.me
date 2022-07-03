import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CodeIcon from "@mui/icons-material/Code";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ApiIcon from "@mui/icons-material/Api";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import BiotechIcon from "@mui/icons-material/Biotech";
import AddModeratorIcon from "@mui/icons-material/AddModerator";

import { useRouter } from "next/router";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }: any) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight({ title, children }: any) {
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color={"secondary"}
            sx={{ cursor: "pointer", flexGrow: 1 }}
            onClick={() => {
              router.push("/");
            }}
          >
            {title || "did:meme"}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              router.push("/create");
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
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              router.push("/issue");
            }}
          >
            <ListItemIcon>
              <AddModeratorIcon />
            </ListItemIcon>
            <ListItemText primary={"Issue"} />
          </ListItem>

          <ListItem
            button
            onClick={() => {
              router.push("/verify");
            }}
          >
            <ListItemIcon>
              <BiotechIcon />
            </ListItemIcon>
            <ListItemText primary={"Verify"} />
          </ListItem>
        </List>
        <Divider />
        <List>
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
    </Box>
  );
}
