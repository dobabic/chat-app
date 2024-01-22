import React from 'react';
import { Form, redirect } from 'react-router-dom';
import { useAuth } from 'Context/UserContext';
import { addContact } from 'Utilities';

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  addContact(data);
  return redirect('/');
}

export default function AddContact() {
  const { currentUser } = useAuth();

  return (
    <>
      <p>Add New Contact</p>
      <Form method="post" action="/addContact">
        <input type="text" name="newContactId" placeholder="User Id" />
        <input hidden readOnly type="text" name="currentUser" value={currentUser.uid} />
        <button type="submit">Add Contact</button>
      </Form>
    </>
  );
}
