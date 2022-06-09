import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import EthereumAddressCard from "./EthereumAddressCard";

declare var window: any;

const InstallMetaMaskCard = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ mb: 2 }} variant={"h6"}>
        Install MetaMask to unlock experimental features.
      </Typography>

      <Button
        onClick={() => {
          const url = `https://docs.metamask.io/guide/`;
          window.open(url);
        }}
        variant="outlined"
        color={"secondary"}
        endIcon={<ExtensionRoundedIcon />}
      >
        Get Started
      </Button>
    </Box>
  );
};

const EthereumMetaMask = ({ resolution }: any) => {
  const { address } = resolution.didDocumentMetadata.ethereum;
  // console.log(resolution);
  return (
    <>
      <Typography variant="body1" sx={{ mb: 1 }} color={"error"}>
        Only on the Ropsten Ethereum Test Network.
      </Typography>
      {!window.ethereum && <InstallMetaMaskCard />}
      {window.ethereum && (
        <EthereumAddressCard
          address={address}
          logo={resolution.didDocumentMetadata.image}
        />
      )}
    </>
  );
};

export default EthereumMetaMask;
