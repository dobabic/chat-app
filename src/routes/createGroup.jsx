import React from 'react';
import { Form, redirect } from 'react-router-dom';
import { useAuth } from 'Context/UserContext';
import { createGroup } from '../firebase-utils';

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  createGroup(data);
  return redirect('/');
}

export default function CreateGroup() {
  const { currentUser } = useAuth();

  return (
    <>
      <div>Create Group</div>
      <Form method="post" action="/createGroup">
        <input type="text" name="groupName" placeholder="Name" />
        <input hidden readOnly type="text" name="userName" value={currentUser.displayName} />
        <input hidden readOnly type="text" name="userId" value={currentUser.uid} />
        <button type="submit">Create Group</button>
      </Form>
    </>
  );
}
