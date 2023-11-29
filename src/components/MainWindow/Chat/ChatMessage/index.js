import React from 'react';
import Linkify from 'linkify-react';
import { useAuth } from '../../../UserContext';
import '../style.scss';

export default function ChatMessage(props) {
  const { currentUser } = useAuth();
  const { text, uid } = props.message;
  const messageClass = uid === currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <Linkify as="p">
        {text}
      </Linkify>
    </div>
  );
}
