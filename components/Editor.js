import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-merbivore';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const Editor = ({ mode, disabled, value, onChange, style }) => {
  const theme = !disabled ? 'monokai' : 'merbivore';
  return (
    <AceEditor
      style={{ width: '100%', ...style }}
      mode={mode}
      theme={theme}
      value={value}
      onChange={onChange}
      readOnly={disabled}
      editorProps={{ $blockScrolling: true }}
      wrapEnabled={true}
    />
  );
};

export default Editor;
