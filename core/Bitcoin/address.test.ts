import bitcore from "bitcore-lib";
import { getPrivateKey } from ".";

const m =
  "sell antenna drama rule twenty cement mad deliver you push derive hybrid";

it("can generate bitcoin address 0", async () => {
  const address = (
    await getPrivateKey(
      m,
      `m/44'/0'/0'/0/0`,
      "secp256k1",
      bitcore.Networks.testnet
    )
  ).toAddress();
  //   https://live.blockcypher.com/btc-testnet/address/mh54xLL62pt5VXKmivS2JYBcv4qNWHJPPo/
  expect(address.toString()).toBe("mh54xLL62pt5VXKmivS2JYBcv4qNWHJPPo");
});

it("can generate bitcoin address 1", async () => {
  const address = (
    await getPrivateKey(
      m,
      `m/44'/0'/0'/0/1`,
      "secp256k1",
      bitcore.Networks.testnet
    )
  ).toAddress();
  //   https://live.blockcypher.com/btc-testnet/address/mftX9bomJhGP2HxZt6dDuAozWVDUYAbov8/
  expect(address.toString()).toBe("mftX9bomJhGP2HxZt6dDuAozWVDUYAbov8");
});
