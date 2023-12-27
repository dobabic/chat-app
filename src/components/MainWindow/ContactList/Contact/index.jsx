import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

const defaultImage = 'https://placehold.co/200x200';

export default function Contact({ contact, id }) {
  function handleClick(e) {
    e.preventDefault();
    // deleteContact();
  }

  return (
    <NavLink
      to={`messages/${id}`}
      className={({ isActive }) => (isActive ? 'active contact' : 'pending contact')}
    >
      <img
        src={contact.image || defaultImage}
        alt="Contact Logo"
      />
      <span>{contact}</span>
      <button type="button" onClick={handleClick}>&#x274c;</button>
    </NavLink>
  );
}
