import bitcore from "bitcore-lib";
import CryptoAccount from "send-crypto";
import { getPrivateKey } from ".";

const m =
  "sell antenna drama rule twenty cement mad deliver you push derive hybrid";

it("confirm address", async () => {
  const privateKey = await getPrivateKey(
    m,
    `m/44'/0'/0'/0/0`,
    "secp256k1",
    bitcore.Networks.testnet
  );
  const address = privateKey.toAddress();
  //   console.log(`address 1: ${address}`);
  const account = new CryptoAccount(privateKey.toString(), {
    network: "testnet",
  });
  expect(address.toString()).toBe(await account.address("BTC"));
});

//   /* Print address */
// console.log(await account.address("BTC"));
//   // > "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
//   /* Print balance */
// console.log(await account.getBalance("BTC"));
//   // > 0.01
//   /* Send 0.01 BTC */
//   const txHash = await account
//     .send("mftX9bomJhGP2HxZt6dDuAozWVDUYAbov8", 0.00001, "BTC")
//     .on("transactionHash", console.log)
//     // > "3387418aaddb4927209c5032f515aa442a6587d6e54677f08a03b8fa7789e688"
//     .on("confirmation", console.log);
//   console.log(txHash);
