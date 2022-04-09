import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";

const HomeAppBar = ({ children }: any) => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            onClick={() => {
              window.location.reload();
            }}
            variant="h6"
            noWrap
            component="div"
            color={"secondary"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex", cursor: "pointer" },
            }}
          >
            did:meme
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  router.push("/docs");
                }}
              >
                <Typography textAlign="center">API</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  window.open("https://github.com/OR13/didme.me");
                }}
              >
                <Typography textAlign="center">Documentation</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color={"secondary"}
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            did:meme
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                router.push("/docs");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              API
            </Button>

            <Button
              onClick={() => {
                window.open("https://github.com/OR13/didme.me");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Documentation
            </Button>
          </Box>
        </Toolbar>

        {children}
      </Container>
    </AppBar>
  );
};
export default HomeAppBar;
