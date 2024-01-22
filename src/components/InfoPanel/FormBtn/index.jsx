import React from 'react';
import { Form } from 'react-router-dom';
import { useAuth } from 'Context/UserContext';

export default function FormBtn({ action, imgSrc }) {
  const { currentUser } = useAuth();

  return (
    <Form method="post" action={action}>
      <button type="submit">
        <img
          src={imgSrc}
          alt="Tab"
        />
      </button>
      <input hidden readOnly type="text" name="currentUser" value={currentUser.uid} />
    </Form>

  );
}
