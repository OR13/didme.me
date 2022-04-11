import { Button } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ImageIcon from "@mui/icons-material/Image";
import SourceIcon from "@mui/icons-material/Source";
import { useRouter } from "next/router";

declare var window: any;

export const DIDSourceButton = ({ resolution }: any) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push("/api/" + resolution.didDocument.id);
      }}
      variant="outlined"
      endIcon={<SourceIcon />}
    >
      DID Source
    </Button>
  );
};

export const RecentTweetsButton = ({ resolution }: any) => {
  return (
    <Button
      onClick={() => {
        const encodedQuery = encodeURIComponent(window.location.href);
        const url = `https:twitter.com/search?q=${encodedQuery}&src=typed_query`;
        window.open(url);
      }}
      variant="outlined"
      endIcon={<TwitterIcon />}
    >
      Recent Tweets
    </Button>
  );
};

export const ShareOnTwitterButton = ({ resolution }: any) => {
  return (
    <Button
      onClick={() => {
        const tweet = `${window.location.href}`;
        const url = `https:twitter.com/intent/tweet?text=${tweet}`;
        window.open(url);
      }}
      variant="outlined"
      endIcon={<TwitterIcon />}
    >
      Share on Twitter
    </Button>
  );
};

export const ViewOnBitcoinButton = ({ resolution }: any) => {
  if (!resolution.didDocumentMetadata.bitcoin) {
    return <></>;
  }
  return (
    <Button
      onClick={() => {
        const url = `https:live.blockcypher.com/btc-testnet/address/${resolution.didDocumentMetadata.bitcoin.address}/`;
        window.open(url);
      }}
      variant="outlined"
      color={"secondary"}
      endIcon={<MonetizationOnIcon />}
    >
      Bitcoin
    </Button>
  );
};

export const ViewOnEthereumButton = ({ resolution }: any) => {
  if (!resolution.didDocumentMetadata.ethereum) {
    return <></>;
  }
  return (
    <Button
      onClick={() => {
        const url = `https:ropsten.etherscan.io/address/${resolution.didDocumentMetadata.ethereum.address}`;
        window.open(url);
      }}
      variant="outlined"
      color={"secondary"}
      endIcon={<MonetizationOnIcon />}
    >
      Ethereum
    </Button>
  );
};

export const BackToDidMemeButton = ({ resolution }: any) => {
  const router = useRouter();
  if (!resolution.didDocument.id.startsWith("did:web")) {
    return <></>;
  }
  return (
    <Button
      onClick={() => {
        const didMeme = resolution.didDocument.alsoKnownAs[0];
        router.push("/" + didMeme);
      }}
      variant="outlined"
      color={"secondary"}
      endIcon={<ImageIcon />}
    >
      Back to did:meme
    </Button>
  );
};
