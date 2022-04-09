import { Typography, Box, Paper } from "@mui/material";

import { deepOrange } from "@mui/material/colors";

import "react-toastify/dist/ReactToastify.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import ReadMoreIcon from "@mui/icons-material/ReadMore";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import NFTHistoryTable from "./nft-history-table";
const NFTHistoryPanel = ({ nft, image }: any) => {
  return (
    <Paper sx={{ p: 4, mt: 8 }}>
      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Non Fungible Token
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Use MetaMask Mobile to transfer this NFT.
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }} color={"error"}>
          Only on the Ropsten Ethereum Test Network.
        </Typography>
        <List dense={true}>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="read-more"
                href="https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReadMoreIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <AccountBalanceWalletIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`Get MetaMask`}
              secondary={`Powered by Google Play Store`}
            />
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="read-more"
                href="https://or13.github.io/didme.me/metamask.html#nft-support"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReadMoreIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: deepOrange[500] }} src={image}></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${nft.history.items[0].to}`}
              secondary={`${nft.history.items[0].token}`}
            />
          </ListItem>
        </List>

        <NFTHistoryTable rows={nft.history.items} />
      </Box>
    </Paper>
  );
};

export default NFTHistoryPanel;
