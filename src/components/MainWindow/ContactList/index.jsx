import React, { useEffect, useState } from 'react';
import { getContacts } from 'Utilities';
import Contact from './Contact';
import './style.scss';

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getContacts()
      .then(setContacts)
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="contactList">
      {contacts.map((contact) => (
        <Contact key={contact.id} id={contact.id} contact={contact.name} />
      ))}
    </div>
  );
}
