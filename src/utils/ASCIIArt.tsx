import React from 'react';

interface ASCIIArtProps {
  art: string;
}

export const ASCIIArt: React.FC<ASCIIArtProps> = ({ art }) => {
  return (
    <pre className="font-mono text-xl leading-none whitespace-pre">
      {art}
    </pre>
  );
};
