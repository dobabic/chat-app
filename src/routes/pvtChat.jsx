import React, { useEffect, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import {
  getMessages, getUsers, sendMessage, getMsgs,
} from 'Utilities';
import { useAuth } from '../context/UserContext';
import InfoPanel from '../components/InfoPanel';
import Chat from '../components/Chat';
import NewMessageForm from '../components/NewMessageForm';
import '../scss/style.scss';

export async function loader({ params }) {
  const dbmessages = await getMessages();
  const contacts = await getUsers();
  const currentContact = contacts.find((obj) => obj.id === params.contactId);
  return { dbmessages, currentContact, params };
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
  const { dbmessages, currentContact, params } = useLoaderData();
  const [messages, setMessages] = useState(dbmessages);
  const { currentUser } = useAuth();
  const { contactId } = params;
  const selectedContact = currentContact.name;
  const filteredMessages = messages.filter((msg) => (msg.receiver === contactId && msg.sender === currentUser.uid)
    || (msg.sender === contactId && msg.receiver === currentUser.uid));

  useEffect(() => {
    getMsgs(setMessages);
  }, [messages.length, contactId]);

  return (
    <>
      {selectedContact
        && <InfoPanel name={selectedContact} />}
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
