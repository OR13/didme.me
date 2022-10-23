import { useEffect, useState } from 'react';

import { CircularProgress, Box, Button } from '@mui/material';

import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import gladstone from '../services/Gladstone';

import { DID } from '@transmute/did-jwk-pqc';
import TrustedMessageCard from './TrustedMessageCard';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { toast } from 'react-toastify';
export default function Jws({ jws }) {
  const [header, setHeader] = useState();
  const [message, setMessage] = useState();
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (jws) {
      const [encodedHeader] = jws.split('.');
      const decodedHeader = window.atob(encodedHeader);
      const parsedHeader = JSON.parse(decodedHeader);
      (async () => {
        const identifiers = await gladstone('Memes').open('Identifiers');
        const maybeTrusted = await identifiers.get(parsedHeader.iss);
        if (maybeTrusted) {
          const verified = await DID.verifyFromDid(jws);
          const messageFromTrustedSource = new TextDecoder().decode(
            verified.payload
          );
          const images = await gladstone('Memes').open('Images');
          const maybeImage = await images.get(parsedHeader.iss);

          setMessage(messageFromTrustedSource);
          setImage(maybeImage.dataUrl);
          setHeader(verified.protectedHeader);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      })();
    }
  }, [jws]);

  return (
    <Box align="center">
      {message ? (
        <>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <TrustedMessageCard
              header={header}
              image={image}
              message={message}
            />
          )}
        </>
      ) : (
        <>
          {jws && (
            <>
              {' '}
              <Avatar aria-label="verified message" sx={{ bgcolor: red[500] }}>
                <GppMaybeIcon />
              </Avatar>
              <pre>{jws.substring(0, 32) + '...'}</pre>
              <Button
                endIcon={<WarningAmberIcon />}
                color={'warning'}
                onClick={() => {
                  navigator.clipboard.writeText(jws);
                  toast.warn('Copied jws to clipboard.');
                }}
              >
                Copy Untrusted Message
              </Button>
            </>
          )}
        </>
      )}
    </Box>
  );
}
