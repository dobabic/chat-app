import React from 'react';
import Linkify from 'linkify-react';
import { useAuth } from 'Context/UserContext';
import '../style.scss';

export default function ChatMessage({ uid, text }) {
  const { currentUser } = useAuth();
  const messageClass = uid === currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <Linkify as="p">
        {text}
      </Linkify>
    </div>
  );
}
