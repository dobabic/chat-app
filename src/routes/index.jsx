import React, { useEffect } from 'react';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { getMessages, sendMessage } from 'Utilities';
import ChatMessage from '../components/MainWindow/ChatWindow/Chat/ChatMessage';
import DatabaseImage from '../components/MainWindow/ChatWindow/Chat/DatabaseImage';
import YoutubeEmbed from '../components/MainWindow/ChatWindow/Chat/YoutubeEmbed';

export async function loader() {
  const messages = await getMessages();
  return { messages };
}

export async function action({ request }) {
  const formData = await request.formData();
  const message = formData.get('newMessage');
  await sendMessage(message);
  return redirect('/');
}

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function Chat() {
  const { messages } = useLoaderData();

  useEffect(() => {
    document.getElementById('input').value = '';
  }, [messages]);
  return (
    <>
      <div className="chatContainer">
        {messages.map((msg) => {
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
