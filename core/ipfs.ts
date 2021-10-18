const ipfsHttpClient = require("ipfs-http-client");
const { urlSource } = ipfsHttpClient;

const ipfsApis = [
  {
    label: "localhost",
    url: "http://localhost:5001",
  },
  {
    label: "infura",
    url: "https://ipfs.infura.io:5001",
  },
];

const ipfsGateways = [
  {
    label: "localhost",
    url: "http://localhost:8080",
  },
  {
    label: "infura",
    url: "https://ipfs.infura.io",
  },
];

const ipfsApi = ipfsApis[1].url;

const ipfsGateway = ipfsGateways[1].url;

const client = ipfsHttpClient({
  // url: "https://ipfs.infura.io:5001",
  url: ipfsApi,
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

export { client, urlSource, ipfsGateway };
