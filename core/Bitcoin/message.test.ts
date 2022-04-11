import bitcore from "bitcore-lib";
import { getPrivateKey } from ".";

const { Message } = bitcore;

const m =
  "sell antenna drama rule twenty cement mad deliver you push derive hybrid";

it("can sign and verify bitcoin message", async () => {
  const privateKey = await getPrivateKey(
    m,
    `m/44'/0'/0'/0/0`,
    "secp256k1",
    bitcore.Networks.testnet
  );
  const address = new bitcore.PrivateKey(privateKey.toWIF()).toAddress();
  const message = new Message("This is an example of a signed message.");
  const signature = message.sign(privateKey);
  const verified = new Message(
    "This is an example of a signed message."
  ).verify(address, signature);
  expect(verified).toBe(true);
});
