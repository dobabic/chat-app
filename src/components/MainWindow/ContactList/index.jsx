import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getContacts } from 'Utilities';
import './style.scss';

const defaultImage = 'https://placehold.co/200x200';

function Contact({ contact, id, onClick }) {
  function handleClick() {
    onClick(contact);
  }

  return (
    <NavLink
      to={`messages/${id}`}
      className={({ isActive }) => (isActive ? 'active contact' : 'pending contact')}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <img
        src={contact.image || defaultImage}
        alt="Contact Logo"
      />
      <span>{contact}</span>
    </NavLink>
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
        <Contact key={contact.id} id={contact.id} contact={contact.name} onClick={onContactClick} />
      ))}
    </div>
  );
}
