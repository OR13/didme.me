## [didme.me](https://didme.me)

#### Is this a joke?

yes.

#### Can I see an example?

[yes.](https://didme.me/did:meme:1zgswzdje885tzr8408m37sjmaa0sthw265ty6hmwzmau48kd809zzrgra4w5w)

#### How does it work?

1. generate ed25519 key
2. convert the public key to multicodec base58btc
3. steganographically embed the public key in a meme.
4. upload the meme to ipfs.
5. convert the cid to a did, with bech32.
6. download the key file, and a reference to the meme.

## DID Method Spec

`did:meme` is a deterministic transformation of `did:key`, that uses IPFS, image content and bech32.

### DID Format

See [did-key](https://w3c-ccg.github.io/did-method-key/#format).

### DID Operations

See [did-key](https://w3c-ccg.github.io/did-method-key/#operations).

#### Create

Generate a `did:key`, steganographically embed the public multicodec in a meme.
Upload the meme to ipfs, transform the CID to a `did:meme` with bech32.
Tranform the associated `did:key` document, as needed.

#### Read

1. Convert the bech32 id to an ipfs CID.
2. Resolve the image.
3. Extract the `did:key` multicodec.
4. Construct the `did:key` document from the identifier.
5. Update the did document to use the `did:meme` identifiers.

#### Update

Not supported.

#### Deactivate

Not supported.

### Security and Privacy Considerations

See [did-key](https://w3c-ccg.github.io/did-method-key/#security-and-privacy-considerations)
