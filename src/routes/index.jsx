import React, { useEffect } from 'react';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { getMessages, sendMessage } from 'Utilities';
import ChatMessage from '../components/MessageTypes/ChatMessage';
import DatabaseImage from '../components/MessageTypes/DatabaseImage';
import YoutubeEmbed from '../components/MessageTypes/YoutubeEmbed';

export async function loader() {
  const messages = await getMessages();
  const filteredMessages = messages.filter((msg) => msg.receiver === null);
  return { filteredMessages };
}

export async function action({ request }) {
  const formData = await request.formData();
  const message = formData.get('newMessage');
  if (message.trim() === '') return null;
  await sendMessage(message);
  return redirect('/');
}

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function Chat() {
  const { filteredMessages } = useLoaderData();

  useEffect(() => {
    document.getElementById('input').value = '';
  }, [filteredMessages]);
  return (
    <>
      <div className="chatContainer">
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
