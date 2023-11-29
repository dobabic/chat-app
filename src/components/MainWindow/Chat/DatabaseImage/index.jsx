import React from 'react';
import { useAuth } from '../../../UserContext';
import '../style.scss';

export default function DatabaseImage(props) {
  const { uid, text } = props;
  const { currentUser } = useAuth();
  const messageClass = uid === currentUser.uid ? 'sent' : 'received';

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
