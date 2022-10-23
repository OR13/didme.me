import { useEffect, useState } from 'react';
import Head from 'next/head';
import AppPage from '../components/AppPage';

import meta from '../services/social';
import DidDocument from '../components/DidDocument';

import { useRouter } from 'next/router';

export default function ClientSideResolver() {
  const router = useRouter();
  const [did, setDid] = useState();

  useEffect(() => {
    const did = router.asPath.replace('/r#', '');
    setDid(did);
  }, [router.asPath]);

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
      <AppPage title={meta.title}>
        <DidDocument did={did} />
      </AppPage>
    </>
  );
}
