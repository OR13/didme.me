import { resolve } from "../core/resolve";
import { getKeysForMnemonic } from "../core/getKeysForMnemonic";
import { getSuite } from "./getSuite";

export const getPresentationSuite = async ({ presentation, mnemonic }: any) => {
  const holder = presentation.holder.id || presentation.holder;
  const { didDocument } = await resolve(holder);
  const keys = await getKeysForMnemonic(mnemonic);
  const authenticationKeys = keys.map((k) => {
    if (k.controller !== holder) {
      k.id = k.id.replace(k.controller, holder);
      k.controller = holder;
    }
    return k;
  });
  if (didDocument.verificationMethod[0].id !== authenticationKeys[0].id) {
    throw new Error("mnemonic is not for holder");
  }
  //   we are exploiting the known structure of did:key here...
  const suite = await getSuite(authenticationKeys[0]);
  return suite;
};
