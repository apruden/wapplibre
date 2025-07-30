import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const sampleCode = `// Sample JavaScript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
`;

export default function CodeMirrorPage() {
  const [code, setCode] = React.useState(sampleCode);

  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h2>JavaScript Code Editor</h2>
      <CodeMirror
        value={code}
        height="400px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
    </div>
  );
}
