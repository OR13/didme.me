## [didme.me](https://didme.me)

### Is this a joke?

yes.

### How does it work?

1. generate ed25519 key
2. convert the public key to multicodec base58btc
3. steganographically embed the public key in a meme.
4. upload the meme to ipfs.
5. convert the cid to a did, with bech32.
6. download the key file, and a reference to the meme.
