import React, { useEffect, useState, useRef } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { getMessages, sendMessage, getMsgs } from 'Utilities';
import ChatMessage from 'MessageTypes/ChatMessage';
import DatabaseImage from 'MessageTypes/DatabaseImage';
import YoutubeEmbed from 'MessageTypes/YoutubeEmbed';

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
  const input = useRef(null);
  const ref = useRef(null);
  const filteredMessages = messages.filter((msg) => msg.receiver === null);

  useEffect(() => {
    getMsgs(setMessages);
    ref.current?.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    input.current.value = '';
  }, [messages.length]);

  return (
    <>
      <div className="chatContainer" ref={ref}>
        {filteredMessages.map((msg) => {
          const MsgComponent = msgComponents[msg.type];
          return <MsgComponent key={msg.id} sender={msg.sender} text={msg.text} />;
        })}
      </div>
      <div className="newMessageContainer">
        <Form method="post">
          <input
            id="input"
            placeholder="Type a message"
            ref={input}
            name="newMessage"
          />
          <button type="submit">
            ✉️
          </button>
        </Form>
      </div>
    </>
  );
}
