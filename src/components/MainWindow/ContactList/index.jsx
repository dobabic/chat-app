import React, { useEffect, useState } from 'react';
import {
  getUsers, getGroups, getUserContacts, deleteContact,
} from 'Utilities';
import { useAuth } from 'Context/UserContext';
import Contact from './Contact';
import Group from './Group';

export default function ContactList() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [userContacts, setUserContacts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    getUsers(setUsers);
    getUserContacts(currentUser.uid, setUserContacts);
    getGroups(setGroups);
  }, [users.length, userContacts.length]);

  return (
    <div className="contactList">
      {users.map((user) => (userContacts.includes(user.uid)
        ? <Contact key={user.uid} contactId={user.uid} contact={user.name} callback={deleteContact} />
        : null))}
      {groups.map((group) => (group.members.find((obj) => obj.id === currentUser.uid)
        ? <Group key={group.id} id={group.id} name={group.name} />
        : null))}
    </div>
  );
}
