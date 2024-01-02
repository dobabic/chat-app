import React from 'react';
import './style.scss';
import { useAuth } from 'Context/UserContext';
import AdminControls from './AdminControls';
import Controls from './Controls';

export default function InfoPanel({ contact }) {
  const { currentUser } = useAuth();
  const groupAdmin = contact.admin;
  const controlsRender = currentUser.uid === groupAdmin ? <AdminControls /> : <Controls />;
  const image = contact.image || 'https://placehold.co/200x200';
  const { name } = contact;

  return (
    <div className="container">
      <div className="contact-info">
        {!groupAdmin
          && (
          <img
            src={image}
            alt="User Logo"
          />
          )}
        <span>{name}</span>
      </div>
      {groupAdmin
        ? controlsRender
        : null}
    </div>
  );
}
