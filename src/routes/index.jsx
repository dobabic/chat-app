import React, { useEffect, useState, useRef } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getMessages, sendMessage, getMsgs } from 'Utilities';
import { storage } from 'Config';
import ChatMessage from 'MessageTypes/ChatMessage';
import DatabaseImage from 'MessageTypes/DatabaseImage';
import YoutubeEmbed from 'MessageTypes/YoutubeEmbed';

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

const msgComponents = {
  text: ChatMessage,
  ytVideo: YoutubeEmbed,
  image: DatabaseImage,
};

export default function Chat() {
  const { dbmessages } = useLoaderData();
  const [messages, setMessages] = useState(dbmessages);
  const input = useRef(null);
  const div = useRef(null);
  const filteredMessages = messages.filter((msg) => msg.receiver === null);

  function handleUpload(file) {
    const fileToUpload = file;
    const imagesRef = ref(storage, `images/${fileToUpload.name}`);
    uploadBytes(imagesRef, fileToUpload)
      .then((data) => {
        getDownloadURL(data.ref)
          .then((d) => sendMessage(d))
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
  }, [messages.length]);

  return (
    <>
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
