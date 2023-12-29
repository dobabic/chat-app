import React, { useEffect, useRef } from 'react';
import ChatMessage from './MessageTypes/ChatMessage';
import DatabaseImage from './MessageTypes/DatabaseImage';
import YoutubeEmbed from './MessageTypes/YoutubeEmbed';

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function Chat({ messages }) {
  const div = useRef(null);

  useEffect(() => {
    div.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages.length]);

  return (
    <>
      {messages.map((msg) => {
        const MsgComponent = msgComponents[msg.type];
        return <MsgComponent key={msg.id} sender={msg.sender} text={msg.text} />;
      })}
      <div ref={div} />
    </>
  );
}
