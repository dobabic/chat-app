import React from 'react';
import { useLoaderData, redirect } from 'react-router-dom';
import { getMessages, sendMessage } from 'Utilities';
import ChatWindow from '../components/MainWindow/ChatWindow';

export async function loader() {
  const messages = await getMessages();
  console.log(messages, 'loader');
  return { messages };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const message = formData.get('newMessage');
  const { contactId } = params;
  await sendMessage(message, contactId);
  return redirect(`/messages/${contactId}`);
}

export default function ChatRoute() {
  const { messages } = useLoaderData();
  console.log(messages, '123');
  return (
    <ChatWindow chatMsgs={messages} />
  );
}
