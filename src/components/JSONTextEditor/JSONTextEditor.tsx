import React, { FC } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import './jsonTextEditor.scss';

interface IProps {
  onChange: (data: { content: string; error: boolean }) => void;
}

const JSONTextEditor: FC<IProps> = (props) => {
  const style = {
    errorMessage: { color: '#ac3232' },
    body: { height: 'auto' },
    container: { height: 'auto' },
    outerBox: { height: 'auto' },
    contentBox: { height: 'auto', minHeight: '150px' },
  };

  return (
    <div className='jsonCreateNewEdtior'>
      <JSONInput
        id='jsonTextInput'
        width='100%'
        colors={{ error: '#ac3232' }}
        style={style}
        onChange={props.onChange}
        onKeyPressUpdate={false}
      />
    </div>
  );
};

export default JSONTextEditor;
