import React from 'react';
import { useAuth } from 'Context/UserContext';
import '../style.scss';

export default function DatabaseImage({ sender, text }) {
  const { currentUser } = useAuth();
  const messageClass = sender === currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img
        src={text}
        alt="Db"
        width="300"
        height="200"
      />
    </div>
  );
}
