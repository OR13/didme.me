export const contractAddress = "0x06778A58A073E5173fac00f1CD4C673CEb176fb8";

import artifact from "./DIDMemeNFT.json";

import allowList from "./allowList.json";

import {
  init,
  close,
  getTokenIdFromUri,
  updateCache,
  getRecentNFTs,
} from "./neo";

export const getContract = async (web3: any) => {
  const contractInstance = new web3.eth.Contract(artifact.abi, contractAddress);
  return contractInstance;
};

export const getHistory = async (did: string) => {
  const {
    NEO4J_CONNECTION,
    NEO4J_USERNAME,
    NEO4J_PASSWORD,
    NFT_CONTRACT_ADDRESS,
    ETHERSCAN_BASEURL,
    ETHERSCAN_API_KEY,
  }: any = process.env;

  // console.log(`
  // URL: ${NEO4J_CONNECTION}
  // USER: ${NEO4J_USERNAME}
  // PASS: ***
  // `);

  // console.log(`
  // BASEURL: ${ETHERSCAN_BASEURL}
  // API_KEY: ***
  // `);

  await init(NEO4J_CONNECTION, NEO4J_USERNAME, NEO4J_PASSWORD);

  await updateCache(ETHERSCAN_BASEURL, ETHERSCAN_API_KEY, NFT_CONTRACT_ADDRESS);

  const history = await getTokenIdFromUri(did);
  await close();
  return {
    count: history.length,
    items: history,
  };
};

export const getSummary = async () => {
  // const { NEO4J_CONNECTION, NEO4J_USERNAME, NEO4J_PASSWORD }: any = process.env;
  // await init(NEO4J_CONNECTION, NEO4J_USERNAME, NEO4J_PASSWORD);
  // const records = await getRecentNFTs();
  // await close();
  return allowList.items;
};
