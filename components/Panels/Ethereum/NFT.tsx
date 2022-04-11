import NFTHistoryPanel from "./nft-history-panel";
import MintNFTCard from "./MintNFTCard";
const NFT = ({ resolution }: any) => {
  return (
    <>
      {!resolution.didDocumentMetadata.nft && <MintNFTCard />}
      {resolution.didDocumentMetadata.nft && (
        <NFTHistoryPanel
          nft={resolution.didDocumentMetadata.nft}
          image={resolution.didDocumentMetadata.image}
        />
      )}
    </>
  );
};

export default NFT;
