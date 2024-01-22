import React, { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { sendMessage, getMessages } from 'Utilities';
import NewMessageForm from '../components/NewMessageForm';
import Chat from '../components/Chat';

export async function action({ request }) {
  const formData = await request.formData();
  const message = formData.get('newMessage');
  if (message.trim() === '') return null;
  await sendMessage(message);
  return null;
}

export default function MainChat() {
  const [messages, setMessages] = useState([]);
  const filteredMessages = messages.filter((msg) => msg.receiver === null);

  useEffect(() => {
    getMessages(setMessages);
  }, [messages.length]);

  return (
    <>
      <div className="chatContainer">
        <Chat messages={filteredMessages} />
      </div>
      <div className="newMessageContainer">
        <Form method="post">
          <NewMessageForm msgLength={messages.length} />
        </Form>
      </div>
    </>
  );
}
