import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
const Web3 = require("web3");
declare var window: any;
// get balance in ETH
const getBalance = (web3: any, address: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address, (error: any, result: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(Web3.utils.fromWei(result));
      }
    });
  });
};
// get accounts
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

const getWeb3 = async (): Promise<any | false> => {
  if (!window.ethereum) {
    alert("You need metamask to use this feature.");
    return false;
  }
  await window.ethereum.request({ method: "eth_requestAccounts" });
  return new Web3(window.ethereum);
};

const Meta = ({ resolution }: any) => {
  const { address } = resolution.didDocumentMetadata.ethereum;
  const [balance, setBalance] = useState("unknown");

  const handleCheckBalance = async () => {
    const web3 = await getWeb3();
    if (web3) {
      const balance = await getBalance(web3, address);
      setBalance(balance);
    }
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

  return (
    <>
      <pre>{JSON.stringify({ address, balance }, null, 2)}</pre>
      <Stack direction="row" spacing={2}>
        <Button onClick={handleCheckBalance}>Check Balance</Button>
        <Button
          onClick={handleSendEth}
          variant={"outlined"}
          color={"secondary"}
        >
          Send ETH{" "}
        </Button>
      </Stack>
    </>
  );
};

export default Meta;
