import React, { useEffect, useState, useRef } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { getMessages, sendMessage, getMsgs } from 'Utilities';
import ChatMessage from 'MessageTypes/ChatMessage';
import DatabaseImage from 'MessageTypes/DatabaseImage';
import YoutubeEmbed from 'MessageTypes/YoutubeEmbed';
import NewMessageForm from '../components/NewMessageForm';

export async function loader() {
  const dbmessages = await getMessages();
  return { dbmessages };
}

export async function action({ request }) {
  const formData = await request.formData();
  const message = formData.get('newMessage');
  if (message.trim() === '') return null;
  await sendMessage(message);
  return null;
}

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function Chat() {
  const { dbmessages } = useLoaderData();
  const [messages, setMessages] = useState(dbmessages);
  const div = useRef(null);
  const filteredMessages = messages.filter((msg) => msg.receiver === null);

  useEffect(() => {
    getMsgs(setMessages);
    div.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages.length]);

  return (
    <>
      <div className="chatContainer">
        {filteredMessages.map((msg) => {
          const MsgComponent = msgComponents[msg.type];
          return <MsgComponent key={msg.id} sender={msg.sender} text={msg.text} />;
        })}
        <div ref={div} />
      </div>
      <div className="newMessageContainer">
        <Form method="post">
          <NewMessageForm msgLength={messages.length} />
        </Form>
      </div>
    </>
  );
}
