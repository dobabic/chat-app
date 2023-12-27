import React, { useEffect, useRef, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  getMessages, getUsers, sendMessage, getMsgs,
} from 'Utilities';
import { storage } from 'Config';
import YoutubeEmbed from 'MessageTypes/YoutubeEmbed';
import ChatMessage from 'MessageTypes/ChatMessage';
import DatabaseImage from 'MessageTypes/DatabaseImage';
import { useAuth } from '../context/UserContext';
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

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function PvtChat() {
  const { dbmessages, currentContact, params } = useLoaderData();
  const [messages, setMessages] = useState(dbmessages);
  const { currentUser } = useAuth();
  const input = useRef(null);
  const div = useRef(null);

  const selectedContact = currentContact.name;
  const filteredMessages = messages.filter((msg) => (msg.receiver === params.contactId && msg.sender === currentUser.uid)
    || (msg.sender === params.contactId && msg.receiver === currentUser.uid));
  const defaultImage = 'https://placehold.co/200x200';

  function handleUpload(file) {
    const fileToUpload = file;
    const imagesRef = ref(storage, `images/${fileToUpload.name}`);
    uploadBytes(imagesRef, fileToUpload)
      .then((data) => {
        getDownloadURL(data.ref)
          .then((d) => sendMessage(d, params.contactId))
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getMsgs(setMessages);
    div.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    input.current.value = '';
  }, [messages.length, params.contactId]);

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
        <div ref={div} />
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
          <label htmlFor="uploadImage" className="upload-label">
            <input id="uploadImage" type="file" onChange={(event) => handleUpload(event.target.files[0])} />
            &#x1F4CE;
          </label>
        </Form>
      </div>
    </>
  );
}
