import jsonld from "jsonld";

import { resolve } from "../core/resolve";

export default async (url) => {
  console.log(url);
  // let maybeCached = localStorage.getItem(url);
  // if (maybeCached) {
  //   console.log("using cache for: ", url);
  //   return {
  //     contextUrl: null, // this is for a context via a link header
  //     document: JSON.parse(maybeCached), // this is the actual document that was loaded
  //     documentUrl: url, // this is the actual context URL after redirects
  //   };
  // }

  // if (url.indexOf("did:") !== -1) {
  //   const { didDocument } = await resolve(url);
  //   localStorage.setItem(url, JSON.stringify(didDocument));
  //   return {
  //     contextUrl: null, // this is for a context via a link header
  //     document: didDocument, // this is the actual document that was loaded
  //     documentUrl: url, // this is the actual context URL after redirects
  //   };
  // }

  // try {
  //   console.log("downloading...", url);
  //   let res = await jsonld.documentLoader(url);
  //   localStorage.setItem(url, JSON.stringify(res.document));
  //   return res;
  // } catch (e) {
  //   console.error("No remote context support for " + url);
  // }
  console.log("No custom context support for " + url);
  throw new Error("No custom context support for " + url);
};
