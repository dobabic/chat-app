import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getMessages } from 'Utilities';
import ChatMessage from '../components/MainWindow/Chat/ChatMessage';
import YoutubeEmbed from '../components/MainWindow/Chat/YoutubeEmbed';
import DatabaseImage from '../components/MainWindow/Chat/DatabaseImage';
import '../components/MainWindow/Chat/style.scss';

// define loader to load all messages where receiver is params.contactId and sender is currently logged user by uid
// add that loader to the index.jsx
// ??? Form u NewMessageForm ??
export async function loader({ params }) {
  const messages = await getMessages();
  return { messages };
}

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function ChatRoute() {
  const { messages } = useLoaderData();
  // const [messages, setMessages] = useState(chatMsgs);

  // Review useEffect and rework it - working in infinite loop
  // Currently getting messages only once -> empty []
  // useEffect(() => {
  //   getMessages()
  //     .then(setMessages)
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="chatContainer">
      {messages.map((msg) => {
        const MsgComponent = msgComponents[msg.type];
        return <MsgComponent key={msg.id} sender={msg.sender} text={msg.text} />;
      })}
    </div>
  );
}
