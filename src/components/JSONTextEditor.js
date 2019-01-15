import React from 'react';
import JSONInput from 'react-json-editor-ajrm';
import '../styles/css/jsonTextEditor.css';

/**
 * JSON Text Editor with syntax highlighting
 * @prop {function} onChange function that triggers on content change
 */
const JSONTextEditor = props => {
  return (
    <div className="jsonCreateNewEdtior">
      <JSONInput
        id="jsonTextInput"
        width="100%"
        colors={{ error: "#ac3232" }}
        style={{ 
          errorMessage: { color: "#ac3232" },
          body: { height: "auto" },
          container: { height: 'auto' },
          outerBox: { height: 'auto' },
          contentBox: { height: 'auto', minHeight: '150px' }
        }}
        onChange={props.onChange}
        onKeyPressUpdate={false}
      />
    </div>
  );
}
 
export default JSONTextEditor;