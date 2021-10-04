import React from 'react';
import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/dracula';

const EditorCode = ({ code, onChange }) => {
  const highlight = (code) => (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={code}
      language='javascript'
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  );
  return (
    <Editor
      value={code}
      onValueChange={onChange}
      highlight={highlight}
      padding={10}
      style={{
        fontSize: '16px',
        boxSizing: 'border-box',
        fontFamily: '"Space Mono NL", "Fira Code", monospace',
        fontWeight: '500',
        ...theme.plain,
      }}
    />
  );
};

export default EditorCode;
