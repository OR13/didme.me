import Head from 'next/head';
import AppPage from '../components/AppPage';

import meta from '../services/social';
import PrepareFile from '../components/PrepareFile';
import { Button } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
export default function Home() {
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
            color={'secondary'}
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
      </AppPage>
    </>
  );
}
