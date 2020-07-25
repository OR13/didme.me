import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Base from "../base/base";
import { DIDDocumentPreview } from "@transmute/material-did-core";

import { didToResolutionResponse } from "../../core";

export const Resolver = (props) => {
  const [state, setState] = React.useState({
    memeUrl: "",
  });
  const { memeUrl } = state;
  React.useEffect(() => {
    (async () => {
      const { didDocument, methodMetadata } = await didToResolutionResponse(
        props.match.params.did
      );
      setState({
        ...state,
        didDocument,
        memeUrl: methodMetadata.memeUrl,
      });
    })();
  }, [memeUrl]);

  return (
    <Base>
      {!state.didDocument ? (
        "loading..."
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img src={state.memeUrl} style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12}>
            <DIDDocumentPreview didDocument={state.didDocument} />
          </Grid>
        </Grid>
      )}
    </Base>
  );
};

Resolver.propTypes = {
  wallet: PropTypes.any,
};
