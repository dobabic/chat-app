import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Contact/style.scss';

export default function Group({ name, id }) {
  return (
    <NavLink
      to={`group/${id}`}
      className={({ isActive }) => (isActive ? 'active contact' : 'contact')}
    >
      <span>{name}</span>
    </NavLink>
  );
}
