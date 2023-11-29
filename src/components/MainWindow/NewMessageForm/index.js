import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { sendMessage } from '../../../firebase-utils';
import './style.scss';

import { storage } from '../../../../firebase-config';

export default function NewMessageForm() {
  const [newMessage, setNewMessage] = useState('');
  const [fileToUpload, setFileToUpload] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    sendMessage(newMessage);
    setNewMessage('');
  };

  function handleUpload() {
    const imagesRef = ref(storage, `images/${fileToUpload.name}`);
    uploadBytes(imagesRef, fileToUpload)
      .then((data) => {
        console.log(data);
        getDownloadURL(data.ref)
          .then((url) => {
            setNewMessage(url);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="newMessageContainer">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">
          ✉️
        </button>
        <label className="upload-label">
          <input id="uploadImage" type="file" onChange={(event) => setFileToUpload(event.target.files[0])} />
          <button type="button" onClick={handleUpload}>&#x1F4CE;</button>
        </label>
      </form>
    </div>
  );
}
