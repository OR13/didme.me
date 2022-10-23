import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { DID } from '@transmute/did-jwk-pqc';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { green } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';

import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { toast } from 'react-toastify';

export default function TrustedMessageCard({ header, image, message }) {
  const router = useRouter();
  const [emojid, setEmojid] = useState();
  useEffect(() => {
    if (header) {
      (async () => {
        const didDocument = await DID.operations.resolve(header.iss);
        const emojid = await DID.getEmojid(
          didDocument.verificationMethod[0].publicKeyJwk
        );
        setEmojid(emojid);
      })();
    }
  }, [header]);

  const handleResolveIssuer = () => {
    router.push('/r#' + header.iss);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Copied to clipboard.');
  };

  return (
    <Card sx={{ maxWidth: 512 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="verified message" sx={{ bgcolor: green[500] }}>
            <VerifiedIcon />
          </Avatar>
        }
        title={`${emojid}`}
        subheader={header.iss.substring(0, 7) + '...' + header.alg}
        action={
          <Button onClick={handleResolveIssuer} endIcon={<FingerprintIcon />}>
            Issuer
          </Button>
        }
      />
      <CardMedia
        component="img"
        height="256"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleShare}
          endIcon={<ShareIcon />}
          variant={'outlined'}
        >
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
