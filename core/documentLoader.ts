import {
  documentLoaderFactory,
  contexts,
} from "@transmute/jsonld-document-loader";

import { resolvers } from "./resolvers";

export const documentLoader = documentLoaderFactory.pluginFactory
  .build({
    contexts: {
      ...contexts.W3C_Decentralized_Identifiers,
      ...contexts.W3C_Verifiable_Credentials,
      ...contexts.W3ID_Security_Vocabulary,
    },
  })

  .addResolver({
    // eslint-disable-next-line
    ["did:key:z6M"]: {
      resolve: resolvers.ed25519,
    },
  })

  .buildDocumentLoader();
