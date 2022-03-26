import { verifyCredential } from "../core/vc-api";
import { verifyPresentation } from "../core/vc-api";

import { CredentialPreview } from "./credential-preview";
import { PresentationPreview } from "./presentation-preview";

const MessagePayloadPreview = ({ payload }: any) => {
  if (typeof payload === "string") {
    const parsedJwtPayload = JSON.parse(
      Buffer.from(payload.split(".")[1], "base64").toString()
    );

    if (parsedJwtPayload.vc) {
      return (
        <CredentialPreview
          credential={payload}
          verifyCredential={verifyCredential}
        />
      );
    }

    if (parsedJwtPayload.vp) {
      return (
        <PresentationPreview
          presentation={payload}
          verifyPresentation={verifyPresentation}
        />
      );
    }
  } else {
  }
  return <>Malformed Data</>;
};

export default MessagePayloadPreview;
