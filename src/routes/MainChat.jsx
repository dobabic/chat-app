import React, { useEffect, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { getMessages, sendMessage, getMsgs } from 'Utilities';
import NewMessageForm from '../components/NewMessageForm';
import Chat from '../components/Chat';

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

export default function MainChat() {
  const { dbmessages } = useLoaderData();
  const [messages, setMessages] = useState(dbmessages);
  const filteredMessages = messages.filter((msg) => msg.receiver === null);

  useEffect(() => {
    getMsgs(setMessages);
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
