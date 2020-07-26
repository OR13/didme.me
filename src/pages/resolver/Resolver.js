import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Base from "../base/base";
import { DIDDocumentPreview } from "@transmute/material-did-core";
import { Helmet } from "react-helmet";
import { didToResolutionResponse } from "../../core";
import { Typography } from "@material-ui/core";

export const Resolver = (props) => {
  const [state, setState] = React.useState({
    memeUrl: "",
  });
  const { memeUrl } = state;
  const { match } = props;
  React.useEffect(() => {
    (async () => {
      const { didDocument, methodMetadata } = await didToResolutionResponse(
        match.params.did
      );
      setState((state) => {
        return {
          ...state,
          didDocument,
          memeUrl: methodMetadata.memeUrl,
        };
      });
    })();
  }, [memeUrl, match]);

  return (
    <Base>
      {!state.didDocument ? (
        "loading..."
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <a href={window.location.origin + "/" + state.didDocument.id}>
                <Typography gutterBottom>{state.didDocument.id}</Typography>
              </a>
              <img src={state.memeUrl} alt="meme" style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>DID Document</Typography>
              <DIDDocumentPreview didDocument={state.didDocument} />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </Base>
  );
};

Resolver.propTypes = {
  wallet: PropTypes.any,
};
