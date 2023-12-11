import React, { useEffect } from 'react';
import {
  Form, useLoaderData, useOutletContext, redirect,
} from 'react-router-dom';
import { getMessages, sendMessage } from 'Utilities';
import { useAuth } from '../context/UserContext';
import ChatMessage from '../components/MessageTypes/ChatMessage';
import DatabaseImage from '../components/MessageTypes/DatabaseImage';
import YoutubeEmbed from '../components/MessageTypes/YoutubeEmbed';
import '../scss/style.scss';

export async function loader({ params }) {
  const messages = await getMessages();
  return { messages, params };
}

export async function action({ request, params }) {
  const { contactId } = params;
  const formData = await request.formData();
  const message = formData.get('newMessage');
  if (message.trim() === '') return null;
  await sendMessage(message, contactId);
  return redirect(`/messages/${contactId}`);
}

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function ChatRoute() {
  const { messages, params } = useLoaderData();
  const { currentUser } = useAuth();
  const selectedContact = useOutletContext();
  const defaultImage = 'https://placehold.co/200x200';
  const filteredMessages = messages.filter((msg) => msg.receiver === params.contactId && msg.sender === currentUser.uid);

  useEffect(() => {
    document.getElementById('input').value = '';
  }, [messages]);

  return (
    <>
      {selectedContact && (
      <div className="contact-info">
        <div className="contact-image">
          <img
            src={defaultImage}
            alt="User Logo"
          />
        </div>
        <div className="contact-name">
          <span>{ selectedContact }</span>
        </div>
      </div>
      )}
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
