import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Box } from '@mui/material';

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
    <Box sx={{ height: '80vh', width: '80vw' }}>
      <CodeMirror
        value={code}
        height="400px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />
    </Box>
  );
}
