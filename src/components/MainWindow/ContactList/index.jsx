import React, { useEffect, useState } from 'react';
import { getContacts, getUserContacts } from 'Utilities';
import { useAuth } from 'Context/UserContext';
import Contact from './Contact';
import './style.scss';

export default function ContactList() {
  const [users, setUsers] = useState([]);
  const [userContacts, setUserContacts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    getContacts(setUsers);
    console.log('1st uE');
  }, [users.length]);

  useEffect(() => {
    getUserContacts(currentUser.uid, setUserContacts);
    console.log('2st uE');
  }, [userContacts.length]);

  return (
    <div className="contactList">
      {users.map((user) => (userContacts.includes(user.uid)
        ? <Contact key={user.uid} id={user.uid} contact={user.name} />
        : null))}
    </div>
  );
}
