export const contractAddress = "0x06778A58A073E5173fac00f1CD4C673CEb176fb8";

import artifact from "./DIDMemeNFT.json";

export const getContract = async (web3: any) => {
  const contractInstance = new web3.eth.Contract(artifact.abi, contractAddress);
  return contractInstance;
};
