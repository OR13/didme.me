import { Typography, Box, Paper, Button } from "@mui/material";

import { useRouter } from "next/router";

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
const Web3 = require("web3");
declare var window: any;
const getWeb3 = async (): Promise<any | false> => {
  if (!window.ethereum) {
    alert("You need metamask to use this feature.");
    return false;
  }
  await window.ethereum.request({ method: "eth_requestAccounts" });
  return new Web3(window.ethereum);
};

const getAccounts = async (web3: any): Promise<Array<string>> => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

import * as NFT from "../core/NFT";

const MintNFT = () => {
  const router = useRouter();
  const { did }: any = router.query;

  return (
    <Paper sx={{ p: 4, mt: 8 }}>
      <Box mt={2}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Non Fungible Token
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Use MetaMask to mint a Non Fungible Token (NFT) for this DID.
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }} color={"error"}>
          Only on the Ropsten Ethereum Test Network.
        </Typography>
        <ToastContainer />

        <List dense={true}>
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
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Contract"
              secondary={
                <Link
                  href={`https://ropsten.etherscan.io/address/${"0x06778A58A073E5173fac00f1CD4C673CEb176fb8"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  0x06778A58A073E5173fac00f1CD4C673CEb176fb8
                </Link>
              }
            />
          </ListItem>
        </List>
        <Button
          variant={"contained"}
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
          Mint NFT
        </Button>
      </Box>
    </Paper>
  );
};

export default MintNFT;
