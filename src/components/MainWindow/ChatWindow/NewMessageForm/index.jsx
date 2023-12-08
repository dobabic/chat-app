import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { sendMessage } from 'Utilities';
import { storage } from 'Config';
import { Form, redirect } from 'react-router-dom';
import './style.scss';

export default function NewMessageForm() {
  const [newMessage, setNewMessage] = useState('');
  // const [fileToUpload, setFileToUpload] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    setNewMessage('');
  };

  // function handleUpload() {
  //   const imagesRef = ref(storage, `images/${fileToUpload.name}`);
  //   uploadBytes(imagesRef, fileToUpload)
  //     .then((data) => {
  //       console.log(data);
  //       getDownloadURL(data.ref)
  //         .then((url) => {
  //           setNewMessage(url);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  return (
    <div className="newMessageContainer">
      <Form method="post">
        <input
          placeholder="Type a message"
          name="newMessage"
          onSubmit={handleSubmit}
        />
        <button type="submit">
          ✉️
        </button>
        {/* <label htmlFor="uploadImage" className="upload-label">
          <input id="uploadImage" type="file" onChange={(event) => setFileToUpload(event.target.files[0])} />
          <button type="button" onClick={handleUpload}>&#x1F4CE;</button>
        </label> */}
      </Form>
    </div>
  );
}
