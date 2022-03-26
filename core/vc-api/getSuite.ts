import { JsonWebKey, JsonWebSignature } from "@transmute/json-web-signature";

export const getSuite = async (key?: any) => {
  return new JsonWebSignature({
    key: !key ? undefined : await JsonWebKey.from(key),
  });
};
