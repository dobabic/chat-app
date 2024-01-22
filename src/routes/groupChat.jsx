import React, { useEffect, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import {
  getMessages, sendMessage, getDocumentById,
} from 'Utilities';
import InfoPanel from '../components/InfoPanel';
import Chat from '../components/Chat';
import NewMessageForm from '../components/NewMessageForm';
import '../scss/style.scss';

export async function loader({ params }) {
  const { groupId } = params;
  const group = await getDocumentById(groupId);
  return group;
}

export async function action({ request, params }) {
  const { groupId } = params;
  const formData = await request.formData();
  const message = formData.get('newMessage');
  if (message.trim() === '') return null;
  await sendMessage(message, groupId);
  return null;
}

export default function GroupChat() {
  const groupData = useLoaderData();
  const { id } = groupData;
  const [messages, setMessages] = useState([]);
  const filteredMessages = messages.filter((msg) => msg.receiver === id);

  useEffect(() => {
    getMessages(setMessages);
  }, [messages.length, id]);

  return (
    <>
      {id
        && <InfoPanel data={groupData} />}
      <div className="chatContainer">
        <Chat messages={filteredMessages} />
      </div>
      <div className="newMessageContainer">
        <Form method="post">
          <NewMessageForm msgLength={messages.length} groupId={id} />
        </Form>
      </div>
    </>
  );
}
