import React from 'react';
import './style.scss';

export default function Tab({ imgSrc, name }) {
  return (
    <div className="tab">
      <img
        src={imgSrc}
        alt="Tab"
      />
      <p>{name}</p>
    </div>
  );
}
