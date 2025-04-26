import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSnippet = ({ code }) => {
  return (
    <div className="code-snippet">
      <SyntaxHighlighter language="javascript" style={atomDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
