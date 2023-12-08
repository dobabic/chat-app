import React from 'react';
import Chat from './Chat';
import NewMessageForm from './NewMessageForm';

export default function ChatWindow({ chatMsgs }) {
  console.log(chatMsgs);
  return (
    <>
      <Chat messages={chatMsgs} />
      <NewMessageForm />
    </>
  );
}
