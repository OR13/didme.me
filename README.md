## [didme.me](https://didme.me)

> The Decentralized Identifiers (DIDs) are a new type of globally unique identifier designed to enable individuals and organizations to generate our own identifiers using systems we trust, and to prove control of those identifiers (authenticate) using cryptographic proofs.

- [W3C DID Core Spec](https://www.w3.org/TR/did-core/)

- [W3C CCG Mailing List Announcement](https://lists.w3.org/Archives/Public/public-credentials/2020Jul/0092.html)

### [DID Meme Example](https://didme.me/did:meme:1zgswzdje885tzr8408m37sjmaa0sthw265ty6hmwzmau48kd809zzrgra4w5w)

## DID Method Spec

`did:meme` is a deterministic transformation of `did:key`, that uses IPFS, image content and bech32.

### DID Format

See [did-key](https://w3c-ccg.github.io/did-method-key/#format).

### DID Operations

See [did-key](https://w3c-ccg.github.io/did-method-key/#operations).

#### Create

1. Generate a `did:key`
2. Steganographically embed the public key multicodec representation in a meme.
3. Upload the meme to ipfs.
4. Transform the CID to a `did:meme` with bech32.
5. Update the did document to use the `did:meme` identifier.

#### Read

1. Convert the bech32 id to an ipfs CID.
2. Resolve the image.
3. Extract the `did:key` multicodec.
4. Construct the `did:key` document from the identifier.
5. Update the did document to use the `did:meme` identifier.

#### Update

Not supported.

#### Deactivate

Not supported.

### Security and Privacy Considerations

See [did-key](https://w3c-ccg.github.io/did-method-key/#security-and-privacy-considerations)
