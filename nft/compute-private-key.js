const bip39 = require("bip39");
const hdkey = require("hdkey");

const getKeysForMnemonic = async (mnemonic, hdpath) => {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root = hdkey.fromMasterSeed(seed);
  const addrNode = root.derive(hdpath);
  console.log("0x" + addrNode._privateKey.toString("hex"));
};

(async () => {
  await getKeysForMnemonic(process.env.MNEMONIC, process.env.HD_PATH);
})();
