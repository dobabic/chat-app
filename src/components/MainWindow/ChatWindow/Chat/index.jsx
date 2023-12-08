import React, { useEffect, useState } from 'react';
import { getMessages } from 'Utilities';
import ChatMessage from './ChatMessage';
import YoutubeEmbed from './YoutubeEmbed';
import DatabaseImage from './DatabaseImage';
import './style.scss';

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function Chat({ chatMsgs }) {
  console.log(chatMsgs, 'last');

  const [messages, setMessages] = useState([]);

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
        return <MsgComponent key={msg.id} sender={msg.sender} text={msg.text} />;
      })}
    </div>
  );
}
