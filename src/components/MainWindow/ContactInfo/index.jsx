import React from 'react';
import './style.scss';

const defaultImage = 'https://placehold.co/200x200';

export default function ContactInfo({ contact }) {
  return (
    <div className="contact-info">
      <div className="contact-image">
        <img
          src={defaultImage}
          alt="User Logo"
        />
      </div>
      <div className="contact-name">
        <span>{ contact }</span>
      </div>
    </div>
  );
}
