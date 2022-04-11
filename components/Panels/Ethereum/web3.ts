const Web3 = require("web3");
declare var window: any;
// get balance in ETH
export const getBalance = (web3: any, address: string): Promise<string> => {
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
export const getAccounts = async (web3: any): Promise<Array<string>> => {
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

export const getWeb3 = async (): Promise<any | false> => {
  if (!window.ethereum) {
    alert("You need metamask to use this feature.");
    return false;
  }
  await window.ethereum.request({ method: "eth_requestAccounts" });
  return new Web3(window.ethereum);
};
