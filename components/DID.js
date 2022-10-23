import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

import CircularProgress from '@mui/material/CircularProgress';
import Fingerprint from '@mui/icons-material/Fingerprint';

import { toast } from 'react-toastify';

import lib from '@transmute/did-jwk-pqc';

export default function DID({ did }) {
  const [emojid, setEmojid] = useState('...');
  useEffect(() => {
    if (did) {
      (async () => {
        const didDocument = await lib.DID.operations.resolve(did);
        const abbreviation = await lib.DID.getEmojid(
          didDocument.verificationMethod[0].publicKeyJwk
        );
        setEmojid(abbreviation);
      })();
    }
  }, [did]);
  const handleClick = () => {
    navigator.clipboard.writeText(did);
    toast.success('Copied to clipboard');
  };

  if (!did) {
    return <CircularProgress />;
  }

  return (
    <Box onClick={handleClick}>
      <Chip
        sx={{ cursor: 'pointer' }}
        variant={'filled'}
        icon={<Fingerprint />}
        label={emojid}
      />
    </Box>
  );
}
