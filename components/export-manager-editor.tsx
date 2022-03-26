import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/theme-dracula";

const ExportManagerEditor = ({ value }: { value: string }) => {
  return (
    <AceEditor
      mode="sh"
      style={{ width: "100%" }}
      maxLines={Infinity}
      theme="dracula"
      wrapEnabled={true}
      readOnly={true}
      value={value}
      editorProps={{ $blockScrolling: true, useWorker: false, wrap: false }}
    />
  );
};

export default ExportManagerEditor;
