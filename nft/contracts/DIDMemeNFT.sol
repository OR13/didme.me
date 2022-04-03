// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DIDMemeNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => uint8) public uris;

    constructor() ERC721("DIDMEME", "DIDMEME") {
        // default
    }

    function awardItem(address invitee, string memory tokenURI)
        public
        returns (uint256)
    {
        require(uris[tokenURI] != 1, "Already minted");

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(invitee, newItemId);
        _setTokenURI(newItemId, tokenURI);

        uris[tokenURI] = 1;

        return newItemId;
    }
}
