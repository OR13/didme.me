import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import { getWeb3, getAccounts, getBalance } from "./web3";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
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
import { QR } from "@bloomprotocol/qr-react";

export function CardMenu({ address }: any) {
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
      </Menu>
    </div>
  );
}

export default function RecipeReviewCard({ address, logo }: any) {
  console.log(logo);
  const [expanded, setExpanded] = React.useState(false);

  const [balance, setBalance] = useState("unknown");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSendEth = async () => {
    const web3 = await getWeb3();
    if (web3) {
      const [userAgentAddress] = await getAccounts(web3);
      if (address.toLowerCase() === userAgentAddress.toLowerCase()) {
        alert("You cannot send eth to yourself.");
      } else {
        const amount = "0.00001"; // recommend small amount of eth
        const amountToSend = web3.utils.toWei(amount, "ether"); // Convert to wei value
        const send = await web3.eth.sendTransaction({
          from: userAgentAddress,
          to: address,
          value: amountToSend,
        });
        console.log(send);
        alert("Ethereum received!");
        // send.transactionHash: "0x6aa900627c6184a354b8dfa2e138585488d2175d81ab205f43322a31b98ea25a"
      }
    }
  };

  React.useEffect(() => {
    (async () => {
      const web3 = await getWeb3();
      if (web3) {
        const balance = await getBalance(web3, address);
        setBalance(balance);
        // console.log(balance);
      }
    })();
  }, [address, setBalance]);

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            0x
          </Avatar>
        }
        action={<CardMenu address={address} />}
        title={address}
        subheader={`${balance} ETH`}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          An ethereum blockchain compatible key was discovered in this DID.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant={"outlined"}
            color={"secondary"}
            onClick={async () => {
              const url = `https://ropsten.etherscan.io/address/${address}`;
              window.open(url);
            }}
          >
            View on Etherscan
          </Button>
          <Button
            variant={"outlined"}
            color={"secondary"}
            onClick={async () => {
              handleSendEth();
            }}
          >
            Send ETH
          </Button>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
          <QrCodeScannerIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ p: 4, maxWidth: "600px", margin: "auto" }}>
          <QR
            data={address}
            width={"100%"}
            bgColor={"#121212"}
            fgColor={"#fff"}
            logo={{ image: logo }}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
