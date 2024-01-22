import React from 'react';
import Linkify from 'linkify-react';

export default function ChatMessage({ text }) {
  return (
    <Linkify as="p">
      {text}
    </Linkify>
  );
}
