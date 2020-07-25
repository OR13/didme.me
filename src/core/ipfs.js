const ipfsHttpClient = require("ipfs-http-client");
const { urlSource } = ipfsHttpClient;

const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001",
  // Could add special did meme codec here....
  // ipld: {
  //   // either specify them as part of the `formats` list
  //   formats: [require("my-format")],

  //   // or supply a function to load them dynamically
  //   loadFormat: async (format) => {
  //     return require(format);
  //   },
  // },
});

export { client, urlSource };
