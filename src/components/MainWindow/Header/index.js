import React from 'react';
import './style.scss';

export default function Header() {
  return (
    <div className="header">
      <div className="title"> Skype</div>
      <div className="windowControls">
        <button type="button">_</button>
        <button type="button">M</button>
        <button type="button">X</button>
      </div>
    </div>
  );
}
