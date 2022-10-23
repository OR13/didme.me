/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { CircularProgress, Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { JWK } from '@transmute/did-jwk-pqc';
import FileUploader from './FileUploader';

import image from '../services/image';

import gladstone from '../services/Gladstone';

import KeyTypeRadioButtons from './KeyTypeRadioButtons';
import CreateIfNotExistsSwitch from './CreateIfNotExistsSwitch';

import { toast } from 'react-toastify';

const writeImageToCanvas = (dataUrl) => {
  const canvas = document.getElementById('canvas-original');
  const context = canvas.getContext('2d');
  const drawing = new Image();
  drawing.src = dataUrl;
  drawing.onload = function () {
    context.drawImage(drawing, 0, 0, canvas.width, canvas.height);
  };
};

// https://twitter.com/foone/status/1095669707795877888?lang=en
const memeDimension = 896;

export default function PrepareFile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [resolveOnly, setResolveOnly] = React.useState(true);
  const [file, setFile] = React.useState();
  const [imageWithSecret, setImageWithSecret] = React.useState();

  const cryptoOptions = [
    { label: 'Dilithium', alg: JWK.dilithium_alg },
    { label: 'Falcon', alg: JWK.falcon_alg },
    { label: 'Sphincs', alg: JWK.sphincs_alg }
  ];
  const [alg, setAlg] = React.useState(cryptoOptions[0].alg);

  const handleFileChange = (files) => {
    setIsLoading(true);
    const [file] = files;
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        // convert image file to base64 string
        writeImageToCanvas(reader.result);
        setTimeout(async () => {
          try {
            const result = await image.decode('#canvas-original', '123', '123');
            if (result.did) {
              const images = await gladstone('Memes').open('Images');
              await images.set(result.did, { dataUrl: result.dataUrl });
              router.push('/r#' + result.did);
            } else {
              setIsLoading(false);
            }
          } catch (e) {
            if (!resolveOnly) {
              handleEncode();
            } else {
              toast.error('Could not resolve an identifier.');
              setFile(null);
              setIsLoading(false);
            }
          }
        }, 500);
      },
      false
    );
    reader.readAsDataURL(file);
    setFile(file);
  };

  const handleReset = () => {
    setFile(null);
  };

  const handleAlgChange = (event) => {
    setAlg(event.target.value);
  };

  const handleEncode = async () => {
    const result = await image.encode('#canvas-original', '123', '123', alg);
    setImageWithSecret(result.image);

    const identifiers = await gladstone('Memes').open('Identifiers');
    await identifiers.set(result.didDocument.id, result.didDocument);

    const keys = await gladstone('Memes').open('Keys');
    await keys.set(result.didDocument.id, result.privateKeyJwk);

    setTimeout(async () => {
      const result = await image.decode('#image-with-secret', '123', '123');
      const images = await gladstone('Memes').open('Images');
      await images.set(result.did, { dataUrl: result.dataUrl });
      router.push('/r#' + result.did);
    }, 0);
  };

  return (
    <Box align="center">
      <Box sx={{ maxWidth: '512px', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          DID MEME
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Decentralized Identifiers inside of Images.
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ mt: 2, mb: 2, display: 'flex', flexDirection: 'row' }}>
            <CreateIfNotExistsSwitch
              checked={resolveOnly}
              onChange={(changed) => {
                setResolveOnly(changed);
              }}
            />
          </Box>
          {!resolveOnly && (
            <KeyTypeRadioButtons
              value={alg}
              onChange={handleAlgChange}
              options={cryptoOptions}
            />
          )}
        </Box>

        {!file && <FileUploader onFilesAccepted={handleFileChange} />}
      </Box>

      {file && (
        <Box sx={{ display: isLoading ? 'none' : 'block' }}>
          <Box sx={{ display: imageWithSecret ? 'none' : 'block' }}>
            <Button onClick={handleReset}>Reset</Button>
            <canvas
              id="canvas-original"
              height={memeDimension}
              width={memeDimension}
            />
            <Button onClick={handleEncode}>Encode</Button>
          </Box>
          {imageWithSecret && (
            <Box>
              <img
                id="image-with-secret"
                alt="image with secret"
                src={imageWithSecret}
              />
            </Box>
          )}
        </Box>
      )}
      {isLoading && <CircularProgress color={'secondary'} sx={{ mt: 4 }} />}
    </Box>
  );
}
