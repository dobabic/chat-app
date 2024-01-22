import React, { useEffect, useRef } from 'react';
import { useAuth } from 'Context/UserContext';
import ChatMessage from './MessageTypes/ChatMessage';
import DatabaseImage from './MessageTypes/DatabaseImage';
import YoutubeEmbed from './MessageTypes/YoutubeEmbed';
import './style.scss';

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function Chat({ messages }) {
  const { currentUser } = useAuth();
  const div = useRef(null);

  useEffect(() => {
    div.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages.length]);

  return (
    <>
      {messages.map((msg) => {
        const MsgComponent = msgComponents[msg.type];
        const messageClass = msg.sender === currentUser.uid ? 'sent' : 'received';

        return (
          <div key={msg.id} className={`message ${messageClass}`}>
            {msg.sender !== currentUser.uid
            && (
            <span className="name">
              {msg.name}
              :
            </span>
            )}
            <MsgComponent sender={msg.sender} text={msg.text} name={msg.name} />
          </div>
        );
      })}
      <div ref={div} />
    </>
  );
}
