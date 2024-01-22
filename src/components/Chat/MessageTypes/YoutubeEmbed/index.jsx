import React from 'react';

export default function YoutubeEmbed({ text }) {
  const videoId = /\?v=(.{11})/.exec(text)[1];

  return (
    <iframe
      title="Youtube link"
      width="300"
      height="200"
      src={`https://www.youtube.com/embed/${videoId}`}
    />
  );
}
