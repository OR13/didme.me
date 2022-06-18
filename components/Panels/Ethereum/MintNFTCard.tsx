import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { red, green } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

import { useState } from "react";

import { getWeb3, getAccounts, getBalance } from "./web3";

import * as NFT from "../../../core/NFT";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import ImageIcon from "@mui/icons-material/Image";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

import { Link } from "@mui/material";

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const address = "0x06778A58A073E5173fac00f1CD4C673CEb176fb8";

export function CardMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            window.open(`https://ropsten.etherscan.io/address/${address}/`);
            handleClose();
          }}
        >
          View on Etherscan
        </MenuItem>

        <MenuItem
          onClick={() => {
            window.open(
              `https://or13.github.io/didme.me/metamask.html#nft-support`
            );
            handleClose();
          }}
        >
          NFT Documentation
        </MenuItem>
      </Menu>
    </div>
  );
}

export default function MintNFTCard() {
  const router = useRouter();
  const { did }: any = router.query;
  return (
    <Card sx={{ ml: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
            <ImageIcon />
          </Avatar>
        }
        action={<CardMenu />}
        title={address}
        subheader={`On Ropsten`}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          You can mint an NFT for this DID with MetaMask.
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Caution! The owner of a DID Meme NFT is not necessarily the same as
          the DID Controller.
        </Typography>

        <ToastContainer />

        <Button
          variant={"outlined"}
          color={"secondary"}
          onClick={async () => {
            try {
              const web3 = await getWeb3();
              const [account] = await getAccounts(web3);
              const contract = await NFT.getContract(web3);
              await contract.methods
                .awardItem(account, "https://didme.me/api/nft/" + did)
                .send({ from: account });
              toast("Wow so easy!");
            } catch (e) {
              toast.error("Probably you need MetaMask!");
            }
          }}
        >
          Mint Token
        </Button>
      </CardContent>
    </Card>
  );
}
