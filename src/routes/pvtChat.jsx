import React, { useEffect, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import {
  getMessages, sendMessage, getDocumentById,
} from 'Utilities';
import { useAuth } from '../context/UserContext';
import InfoPanel from '../components/InfoPanel';
import Chat from '../components/Chat';
import NewMessageForm from '../components/NewMessageForm';
import '../scss/style.scss';

export async function loader({ params }) {
  return { params };
}

export async function action({ request, params }) {
  const { contactId } = params;
  const formData = await request.formData();
  const message = formData.get('newMessage');
  if (message.trim() === '') return null;
  await sendMessage(message, contactId);
  return null;
}

export default function PvtChat() {
  const [messages, setMessages] = useState([]);
  const [contact, setContact] = useState();
  const { currentUser } = useAuth();
  const { params } = useLoaderData();
  const { contactId } = params;
  const filteredMessages = messages.filter((msg) => (msg.receiver === contactId && msg.sender === currentUser.uid)
    || (msg.sender === contactId && msg.receiver === currentUser.uid));

  useEffect(() => {
    getMessages(setMessages);
    getDocumentById(contactId)
      .then((user) => setContact(user));
  }, [messages.length, contactId]);

  return (
    <>
      {contact
        && <InfoPanel contact={contact} />}
      <div className="chatContainer">
        <Chat messages={filteredMessages} />
      </div>
      <div className="newMessageContainer">
        <Form method="post">
          <NewMessageForm msgLength={messages.length} contactId={contactId} />
        </Form>
      </div>
    </>
  );
}
