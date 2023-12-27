import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'Context/UserContext';
import { deleteContact } from 'Utilities';
import './style.scss';

const defaultImage = 'https://placehold.co/200x200';

export default function Contact({ contact, id }) {
  const { currentUser } = useAuth();

  function handleClick(e) {
    e.preventDefault();
    deleteContact(id, currentUser.uid);
  }

  return (
    <NavLink
      to={`messages/${id}`}
      className={({ isActive }) => (isActive ? 'active contact' : 'contact')}
    >
      <img
        src={contact.image || defaultImage}
        alt="Contact Logo"
      />
      <span>{contact}</span>
      <button className="removeContact" type="button" onClick={handleClick}>&#x274c;</button>
    </NavLink>
  );
}
