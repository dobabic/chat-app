import React from 'react';
import { Form, redirect } from 'react-router-dom';

export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData);
  return redirect('/');
}

export default function AddContact() {
  return (
    <Form method="post">
      <p>Add New Contact</p>
      <input type="text" name="id" placeholder="User Id" />
      <button type="submit">Add Contact</button>
    </Form>
  );
}
