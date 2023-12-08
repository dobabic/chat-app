import React, { useEffect } from 'react';
import { Form, useLoaderData, redirect } from 'react-router-dom';
import { getMessages, sendMessage } from 'Utilities';
import ChatMessage from '../components/MainWindow/ChatWindow/Chat/ChatMessage';
import DatabaseImage from '../components/MainWindow/ChatWindow/Chat/DatabaseImage';
import YoutubeEmbed from '../components/MainWindow/ChatWindow/Chat/YoutubeEmbed';
import '../components/MainWindow/ChatWindow/NewMessageForm/style.scss';

export async function loader({ params }) {
  const messages = await getMessages();
  const filteredMessages = messages.filter((msg) => msg.receiver === params.contactId);
  return { filteredMessages };
}

export async function action({ request, params }) {
  const { contactId } = params;
  const formData = await request.formData();
  const message = formData.get('newMessage');
  await sendMessage(message, contactId);
  return redirect(`/messages/${contactId}`);
}

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function ChatRoute() {
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
