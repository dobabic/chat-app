import React from 'react';
import './style.scss';
import { useAuth } from 'Context/UserContext';
import AdminControls from './AdminControls';
import Controls from './Controls';

export default function InfoPanel({ data }) {
  const { currentUser } = useAuth();
  const { name, admin, id } = data;
  const controlRender = currentUser.uid === admin ? <AdminControls id={id} /> : <Controls />;
  const image = data.image || 'https://placehold.co/200x200';

  return (
    <div className="container">
      <div className="contact-info">
        {!admin
          && (
          <img
            src={image}
            alt="User Logo"
          />
          )}
        <span>{name}</span>
      </div>
      {admin
        ? controlRender
        : null}
    </div>
  );
}
