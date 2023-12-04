import React, { useEffect, useState } from 'react';
import { getContacts } from 'Utilities';
import './style.scss';

const defaultImage = 'https://placehold.co/200x200';

function Contact({ contact, onClick }) {
  function handleClick() {
    onClick(contact);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className="contact"
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <img
        src={contact.image || defaultImage}
        alt="Contact Logo"
      />
      <span className="contact-name">{contact}</span>
    </div>
  );
}

export default function ContactList({ onContactClick }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts()
      .then(setContacts)
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="contactList">
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact.name} onClick={onContactClick} />
      ))}
    </div>
  );
}
