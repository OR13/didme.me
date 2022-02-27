import React from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import { Button } from "@mui/material";

const copyToClipboard = (content: string) => {
  const textField = document.createElement("textarea");
  textField.innerText = content;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};

const JsonViewReadOnly = ({ value }: any) => {
  return (
    <>
      <Button
        onClick={() => {
          const content = JSON.stringify(value, null, 2);
          copyToClipboard(content);
          alert("Copied to clipboard");
        }}
      >
        Copy
      </Button>
      <AceEditor
        mode="json"
        theme="pastel_on_dark"
        wrapEnabled={true}
        readOnly={true}
        value={JSON.stringify(value, null, 2)}
        editorProps={{ $blockScrolling: true, useWorker: false }}
      />
    </>
  );
};

export default JsonViewReadOnly;
