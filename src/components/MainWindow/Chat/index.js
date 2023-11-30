import React, { useEffect, useState, useRef } from 'react';
import { getMessages } from '../../../firebase-utils';
import ChatMessage from './ChatMessage';
import YoutubeEmbed from './YoutubeEmbed';
import DatabaseImage from './DatabaseImage';
import './style.scss';

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);

  // Review useEffect and rework it - working in infinite loop
  // Currently getting messages only once -> empty []
  useEffect(() => {
    getMessages()
      .then(setMessages)
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="chatContainer">
      {messages.map((msg) => {
        const MsgComponent = msgComponents[msg.type];
        return <MsgComponent key={msg.id} message={msg} />;
      })}
      <div ref={ref} />
    </div>
  );
}
