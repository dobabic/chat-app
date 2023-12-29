import React from 'react';
import { Form, redirect } from 'react-router-dom';
import { useAuth } from 'Context/UserContext';
import { createGroup } from '../firebase-utils';

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  createGroup(data) // addDoc
    .then((d) => console.log(d.id));
  return redirect('/');
}

// Create, Delete, Leave Group; Remove member
// 2. grupa treba id
//      4. vise grupa moze imati isto ime
// 5. lista clanova u grupi
// 3. ako grupa nema clanova automatski se pobrise
export default function CreateGroup() {
  const { currentUser } = useAuth();

  return (
    <>
      <div>Create Group</div>
      <Form method="post" action="/createGroup">
        <input type="text" name="groupName" placeholder="Name" />
        <input hidden readOnly type="text" name="currentUser" value={currentUser.uid} />
        <button type="submit">Create Group</button>
      </Form>
    </>
  );
}
