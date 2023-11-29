import React from 'react';
import { useAuth } from '../../../UserContext';
import '../style.scss';

export default function YoutubeEmbed(props) {
  const { uid, text } = props;
  const { currentUser } = useAuth();
  const messageClass = uid === currentUser.uid ? 'sent' : 'received';
  const videoId = /\?v=(.{11})/.exec(text)[1];

  return (
    <div className={`message ${messageClass}`}>
      <iframe
        title="Youtube link"
        width="300"
        height="200"
        src={`https://www.youtube.com/embed/${videoId}`}
      />
    </div>
  );
}
