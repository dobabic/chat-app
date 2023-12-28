import React, { useRef, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'Config';
import { sendMessage } from 'Utilities';
import './style.scss';

export default function NewMessageForm({ contactId, msgLength }) {
  const input = useRef(null);

  function handleUpload(file) {
    const fileToUpload = file;
    const imagesRef = ref(storage, `images/${fileToUpload.name}`);
    uploadBytes(imagesRef, fileToUpload)
      .then((data) => {
        getDownloadURL(data.ref)
          .then((d) => sendMessage(d, contactId))
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    input.current.value = '';
  }, [msgLength]);

  return (
    <>
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
    </>
  );
}
