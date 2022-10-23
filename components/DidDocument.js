/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { DID } from '@transmute/did-jwk-pqc';

import IssuerCard from './IssuerCard';

export default function DidDocument({ did }) {
  const [didDocument, setDidDocument] = useState();

  useEffect(() => {
    if (did) {
      (async () => {
        const didDocument = await DID.operations.resolve(did);
        setDidDocument(didDocument);
      })();
    }
  }, [did]);

  return (
    <Box align="center">
      {didDocument && <IssuerCard didDocument={didDocument} />}
    </Box>
  );
}
