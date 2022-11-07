import Head from 'next/head';
import AppPage from '../components/AppPage';

import meta from '../services/social';
import PrepareFile from '../components/PrepareFile';
import { Button, Box, Typography } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const getRandomExample = () => {
  const items = ['🐌🦬🐪.png', '🐠🌷🦞.png', '🐸🦧🦤.png'];
  const item = items[Math.floor(Math.random() * items.length)];
  return item;
};

export default function Home() {
  const example = getRandomExample();
  return (
    <>
      <Head>
        <title>did:meme</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content={meta.domain} />
        <meta name="twitter:url" content={meta.url} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>

      <AppPage
        title={meta.title}
        action={
          <Button
            onClick={() => {
              var a = document.createElement('a');
              a.href = `https://source.unsplash.com/random?nature`;
              a.download = `random.png`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            endIcon={<CasinoIcon />}
          >
            Get Random Image
          </Button>
        }
      >
        <PrepareFile />

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={'column'}
          sx={{ p: 2 }}
        >
          <Button
            color={'secondary'}
            variant={'outlined'}
            sx={{ m: 2 }}
            onClick={() => {
              var a = document.createElement('a');
              a.href = `/${example}`;
              a.download = example;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            endIcon={<CloudDownloadIcon />}
          >
            Download this Example
          </Button>

          <img src={`/${example}`} style={{ maxWidth: '512px' }} />
        </Box>
      </AppPage>
    </>
  );
}
