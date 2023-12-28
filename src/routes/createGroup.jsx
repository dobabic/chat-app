import React from 'react';
import { Form } from 'react-router-dom';

// export  function action({ request }) {
// }

// Create, Delete, Leave Group; Remove member
// 1. group creator = admin
// 2. grupa treba id
//      4. vise grupa moze imati isto ime
// 3. ako grupa nema clanova automatski se pobrise
export default function CreateGroup() {
  return (
    <>
      <div>Create Group</div>
      <Form>
        <input type="text" name="groupName" placeholder="Name" />

        <button type="submit">Create Group</button>
      </Form>
    </>
  );
}
