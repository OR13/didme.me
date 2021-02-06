## [didme.me](https://didme.me)

> The Decentralized Identifiers (DIDs) are a new type of globally unique identifier designed to enable individuals and organizations to generate our own identifiers using systems we trust, and to prove control of those identifiers (authenticate) using cryptographic proofs.

- [W3C DID Core Spec](https://www.w3.org/TR/did-core/)

- [W3C CCG Mailing List Announcement](https://lists.w3.org/Archives/Public/public-credentials/2020Jul/0092.html)

### [DID Meme Example](https://didme.me/did:meme:1zgswzdje885tzr8408m37sjmaa0sthw265ty6hmwzmau48kd809zzrgra4w5w)

## DID Method Spec

`did:meme` is a deterministic transformation of `did:key`, that uses IPFS, image content and bech32.

### DID Format

```
did-meme-format := did:meme:<bech32-value>
bech32-value    := [a-zA-HJ-NP-Z0-9]+
```

The `bech32-value` is an encoded [multihash](https://multiformats.io/multihash/).

The `multihash` is a content identifier for an image.

The image contains a steganographically embedded `did:key`.

See [did-key](https://w3c-ccg.github.io/did-method-key/#format).

Another way of representing the `did:meme` identifier encoding:

```
did:meme:<bech32(
    multihash(
        stego-embed(image, did:key)
    )
)>
```

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

#### Security

Because update and deactivate are not supported, did:meme should only be used for very short lived interactions, or just lulz.

Because `did:meme` identifiers are a super set of `did:key`, it is possible for multiple `did:meme` to map to the same `did:key`... This can be problematic when private key compromise has occured.

Generally speaking, `did:meme` has similar or weaker security properties compared with `did:key`.

#### Privacy

Be careful to strip XIF data or other meta data from images before constructing `did:meme`.

Do not use images that identify physical locations or people.
