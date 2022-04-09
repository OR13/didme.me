import { getHistory } from "./NFT";
export const resolutionWithNFTHistory = async (resolution: any) => {
  const did = resolution.didDocument.id;
  const history = await getHistory(did);

  if (history.count > 0) {
    resolution.didDocumentMetadata.nft = { did, history };
  }
  return resolution;
};
