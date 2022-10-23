import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

import { red, green } from '@mui/material/colors';
import KeyIcon from '@mui/icons-material/Key';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import GppGoodIcon from '@mui/icons-material/GppGood';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';

import { useRouter } from 'next/router';

import { DID, JWS } from '@transmute/did-jwk-pqc';

import gladstone from '../services/Gladstone';
import TrustSwitch from './TrustSwitch';

export default function IssuerCard({ didDocument }) {
  const router = useRouter();
  const [isIdentifierTrusted, setIsIdentifierTrusted] = useState(false);
  const [privateKeyJwk, setPrivateKeyJwk] = useState();
  const [emojid, setEmojid] = useState();
  const [image, setImage] = useState();
  const [message, setMessage] = useState(
    'It’s a dangerous business, Frodo, going out your door. 🧠💎'
  );

  useEffect(() => {
    if (didDocument) {
      (async () => {
        const emojid = await DID.getEmojid(
          didDocument.verificationMethod[0].publicKeyJwk
        );
        setEmojid(emojid);
        const keys = await gladstone('Memes').open('Keys');
        const maybeKey = await keys.get(didDocument.id);
        if (maybeKey) {
          setPrivateKeyJwk(maybeKey);
        }
        const images = await gladstone('Memes').open('Images');
        const maybeImage = await images.get(didDocument.id);
        if (maybeImage) {
          setImage(maybeImage.dataUrl);
        }
        const identifiers = await gladstone('Memes').open('Identifiers');
        const maybeTrusted = await identifiers.get(didDocument.id);
        if (maybeTrusted) {
          setIsIdentifierTrusted(true);
        }
      })();
    }
  }, [didDocument]);

  const handleTrustChange = async (trusted) => {
    const identifiers = await gladstone('Memes').open('Identifiers');
    if (trusted) {
      await identifiers.set(didDocument.id, didDocument);
    } else {
      await identifiers.unset(didDocument.id);
    }
    setIsIdentifierTrusted(trusted);
  };

  const handleDeletePrivateKey = async () => {
    const keys = await gladstone('Memes').open('Keys');
    await keys.unset(didDocument.id);
    setPrivateKeyJwk(null);
  };

  const handleSignWithPrivatekey = async () => {
    const jws = await JWS.sign({
      header: {
        iss: didDocument.id,
        kid: '#0'
      },
      payload: message,
      privateKeyJwk
    });
    router.push('/s#' + jws);
  };

  return (
    <Card sx={{ maxWidth: 512 }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="verified message"
            sx={{ bgcolor: isIdentifierTrusted ? green[500] : red[500] }}
          >
            {isIdentifierTrusted ? <GppGoodIcon /> : <GppMaybeIcon />}
          </Avatar>
        }
        title={`${emojid}`}
        subheader={
          didDocument.id.substring(0, 7) +
          '...' +
          didDocument.verificationMethod[0].publicKeyJwk.alg
        }
        action={
          <TrustSwitch
            checked={isIdentifierTrusted}
            onChange={handleTrustChange}
          />
        }
      />
      {image && (
        <CardMedia
          component="img"
          height="256"
          image={image}
          alt="did document in image"
        />
      )}

      <CardContent>
        <TextField
          label="Message"
          multiline
          fullWidth
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          variant="filled"
        />
      </CardContent>
      <CardActions>
        {!isIdentifierTrusted && privateKeyJwk && (
          <Button
            onClick={handleDeletePrivateKey}
            endIcon={<KeyIcon />}
            sx={{ m: 1 }}
          >
            Delete
          </Button>
        )}

        {isIdentifierTrusted && privateKeyJwk && (
          <Button
            onClick={handleSignWithPrivatekey}
            endIcon={<EnhancedEncryptionIcon />}
            sx={{ m: 1 }}
            variant={'contained'}
          >
            Sign
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
