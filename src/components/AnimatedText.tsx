import React from 'react';

const AnimatedText = ({ text }: { text: string }) => (
  <span className="inline-block animate-gradient-text bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
    {text}
  </span>
);

export default AnimatedText;
