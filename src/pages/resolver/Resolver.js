import React from "react";

import Base from "../base/base";

import { Helmet } from "react-helmet";

import { resolve } from "../../core";

import CircularProgress from "@material-ui/core/CircularProgress";

import { ResolutionTabs } from "../../components/ResolutionTabs";

export const Resolver = (props) => {
  const [state, setState] = React.useState({
    memeUrl: "",
  });
  const { memeUrl } = state;
  const { match } = props;
  React.useEffect(() => {
    (async () => {
      const { didDocument, didMethodMetadata } = await resolve(
        match.params.did
      );
      setState((state) => {
        return {
          ...state,
          didDocument,
          memeUrl: didMethodMetadata.memeUrl,
        };
      });
    })();
  }, [memeUrl, match]);

  return (
    <Base>
      {!state.didDocument ? (
        <CircularProgress
          color="secondary"
          style={{
            margin: "auto",
            display: "block",
            marginTop: "35%",
            width: "72px",
            height: "72px",
          }}
        />
      ) : (
        <React.Fragment>
          <Helmet>
            <meta charSet="utf-8" />
            <title>DID Meme</title>
            <link
              rel="canonical"
              href={window.location.origin + "/" + state.didDocument.id}
            />
            <meta property="og:image" content={state.memeUrl} />
            <script type="application/ld+json">{`
              {
                  "@context": "http://schema.org"
              }
          `}</script>
          </Helmet>
          <ResolutionTabs
            memeUrl={state.memeUrl}
            didDocument={state.didDocument}
          />
        </React.Fragment>
      )}
    </Base>
  );
};

Resolver.propTypes = {};
