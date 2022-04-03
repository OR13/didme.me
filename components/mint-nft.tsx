import { Typography, Box, Paper, Button } from "@mui/material";

import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          Mint an NFT
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Use MetaMask to mint an NFT for this DID. You cannot mint more than
          once per Token URI.
        </Typography>
        <ToastContainer />
        <Button
          onClick={async () => {
            const web3 = await getWeb3();
            const [account] = await getAccounts(web3);
            const contract = await NFT.getContract(web3);
            await contract.methods
              .awardItem(account, "https://didme.me/api/nft/" + did)
              .send({ from: account });
            toast("Wow so easy!");
          }}
        >
          Mint NFT
        </Button>
      </Box>
    </Paper>
  );
};

export default MintNFT;
