import React, { useEffect, useRef, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import {
  getMessages, getContacts, sendMessage, getMsgs,
} from 'Utilities';
import YoutubeEmbed from 'MessageTypes/YoutubeEmbed';
import ChatMessage from 'MessageTypes/ChatMessage';
import DatabaseImage from 'MessageTypes/DatabaseImage';
import { useAuth } from '../context/UserContext';
import '../scss/style.scss';

export async function loader({ params }) {
  const dbmessages = await getMessages();
  const contacts = await getContacts();
  const currentContact = contacts.filter((obj) => obj.id === params.contactId)[0];
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

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function ChatRoute() {
  const { dbmessages, currentContact, params } = useLoaderData();
  const [messages, setMessages] = useState(dbmessages);
  const { currentUser } = useAuth();
  const input = useRef(null);
  const ref = useRef(null);
  const selectedContact = currentContact.name;
  const filteredMessages = messages.filter((msg) => msg.receiver === params.contactId && msg.sender === currentUser.uid);
  const defaultImage = 'https://placehold.co/200x200';

  useEffect(() => {
    getMsgs(setMessages);
    ref.current?.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    input.current.value = '';
  }, [messages.length]);

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
            ref={input}
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
