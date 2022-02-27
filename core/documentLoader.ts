import {
  documentLoaderFactory,
  contexts,
} from "@transmute/jsonld-document-loader";

import { resolvers } from "./resolvers";

import { contexts as localContexts } from "./contexts";

export const documentLoader = documentLoaderFactory.pluginFactory
  .build({
    contexts: {
      ...contexts.W3C_Decentralized_Identifiers,
      ...contexts.W3C_Verifiable_Credentials,
      ...contexts.W3ID_Security_Vocabulary,
    },
  })
  .addContext(localContexts)
  .addResolver({
    // eslint-disable-next-line
    ["did:key:"]: {
      resolve: resolvers.key,
    },
  })
  .addResolver({
    // eslint-disable-next-line
    ["did:meme:"]: {
      resolve: resolvers.meme,
    },
  })

  .buildDocumentLoader();
