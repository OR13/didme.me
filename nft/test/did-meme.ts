/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import { ethers } from "hardhat";

describe("DIDMeme", function () {
  it("should be deployable", async function () {
    const DIDMeme = await ethers.getContractFactory("DIDMemeNFT");
    const myMemes = await DIDMeme.deploy();
    await myMemes.deployed();
    expect(await myMemes.name()).to.equal("DIDMEME");
    expect(await myMemes.symbol()).to.equal("DIDMEME");
  });

  it("should allow mint of did meme nft", async function () {
    const DIDMeme = await ethers.getContractFactory("DIDMemeNFT");
    const myMemes = await DIDMeme.deploy();
    await myMemes.deployed();
    const [owner] = await ethers.getSigners();

    const did =
      "did:web:OR13.github.io:memes:1zgswzdje885tzr8408m37sjmaa0sthw265ty6hmwzmau48kd809zzrgra4w5w";
    const tx = await myMemes.awardItem(
      owner.address,
      "https://didme.me/api/nft/" + did
    );
    expect(tx.hash).not.to.be.undefined;
  });

  it("should reject attempts to mint same did twice", async function () {
    const DIDMeme = await ethers.getContractFactory("DIDMemeNFT");
    const myMemes = await DIDMeme.deploy();
    await myMemes.deployed();
    const [owner] = await ethers.getSigners();
    const did =
      "did:web:OR13.github.io:memes:1zgswzdje885tzr8408m37sjmaa0sthw265ty6hmwzmau48kd809zzrgra4w5w";
    const tx1 = await myMemes.awardItem(
      owner.address,
      "https://didme.me/api/nft/" + did
    );
    expect(tx1.hash).not.to.be.undefined;
    try {
      await myMemes.awardItem(owner.address, "https://didme.me/api/nft/" + did);
    } catch (e: any) {
      expect(e.message).to.equal(
        "VM Exception while processing transaction: reverted with reason string 'Already minted'"
      );
    }
  });
});
