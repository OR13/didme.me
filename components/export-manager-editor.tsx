import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-pastel_on_dark";

const ExportManagerEditor = ({ value }: { value: string }) => {
  return (
    <AceEditor
      mode="markdown"
      theme="pastel_on_dark"
      wrapEnabled={true}
      readOnly={true}
      value={value}
      editorProps={{ $blockScrolling: true, useWorker: false }}
    />
  );
};

export default ExportManagerEditor;
    