import React from 'react';

export default function InfoPanel(props) {
  const image = props.image || 'https://placehold.co/200x200';
  const { name } = props;

  return (

    <div className="contact-info">
      <div className="contact-image">
        <img
          src={image}
          alt="User Logo"
        />
      </div>
      <div className="contact-name">
        <span>{name}</span>
      </div>
    </div>

  );
}

// dodati group & channel content (add, remove member), (leave, delete group)
