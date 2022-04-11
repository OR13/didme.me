import EthereumMetaMask from "./Ethereum/EthereumMetaMask";
import NFT from "./Ethereum/NFT";
export const Ethereum = ({ resolution }: any) => {
  return (
    <>
      {resolution.didDocumentMetadata.ethereum && (
        <EthereumMetaMask resolution={resolution} />
      )}
      <NFT resolution={resolution} />
    </>
  );
};
