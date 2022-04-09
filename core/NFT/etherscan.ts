import axios from "axios";
import InputDataDecoder from "ethereum-input-data-decoder";
import artifact from "./DIDMemeNFT.json";
const decoder = new InputDataDecoder(artifact.abi);
const delay = 0.5;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
}
const decodeTransaction = (result: any) => {
  const didmeme: any = {};
  if (result.from === "0x0000000000000000000000000000000000000000") {
    didmeme.action = "MINT";
  } else {
    didmeme.action = "TRANSFER";
  }
  result.didmeme = didmeme;
  return result;
};

const getTokenActivity = async (
  baseUrl: string,
  apiKey: string,
  contractAddress: string,
  lastBlockNumber: string
) => {
  await sleep(delay * 1000);
  const getTransactionDetails = async (tx: any) => {
    await sleep(delay * 1000);
    const url = `${baseUrl}/api?module=proxy&action=eth_getTransactionByHash&txhash=${tx.hash}&apikey=${apiKey}`;
    const res: any = await axios.get(url);
    const txData = res.data.result;
    txData.inputData = decoder.decodeData(txData.input);
    return txData;
  };
  const url = `${baseUrl}/api?module=account&action=tokennfttx&contractaddress=${contractAddress}&startblock=${lastBlockNumber}&endblock=999999999&sort=asc&apikey=${apiKey}`;
  const res: any = await axios.get(url);
  const transactions = res.data.result;
  if (transactions.length === 0) {
    return;
  }
  const extended = transactions.map(decodeTransaction);
  for (let tx of extended) {
    tx.didmeme.tx = await getTransactionDetails(tx);
  }
  const final = {
    ...res.data,
    result: extended,
    lastBlockNumber: extended[extended.length - 1].blockNumber,
  };
  return final;
};

export { getTokenActivity };
