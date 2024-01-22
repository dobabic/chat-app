import React, { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import '../style.scss';
import addMember from 'Assets/add-member.svg';
import removeMember from 'Assets/remove-member.svg';
import deleteGroup from 'Assets/delete-group.svg';
import leaveGroup from 'Assets/leave-group.svg';
import { removeFromGroup, getGroup } from 'Utilities';
import Popup from './Popup';
import FormBtn from '../FormBtn';
import Contact from '../../MainWindow/ContactList/Contact';

export default function AdminControls({ id }) {
  const [addPopup, setAddButtonPopup] = useState(false);
  const [removePopup, setRemoveButtonPopup] = useState(false);
  const [group, setGroup] = useState(null);
  const members = group ? group.members : [];

  function handleAddClick() {
    setAddButtonPopup(!addPopup);
  }
  function handleRemoveClick() {
    setRemoveButtonPopup(!removePopup);
  }

  useEffect(() => {
    getGroup(id, setGroup);
  }, []);

  return (
    <div className="admin-controls">
      <button type="submit" onClick={handleAddClick}>
        <img
          src={addMember}
          alt="add to grp"
        />
      </button>
      <Popup trigger={addPopup} setTrigger={setAddButtonPopup}>
        <h4>Add contact to group</h4>
        <Form method="post" action="addToGroup">
          <input type="text" placeholder="Contact Id" name="contactId" />
          <button type="submit">Add</button>
        </Form>
      </Popup>
      <button type="submit" onClick={handleRemoveClick}>
        <img
          src={removeMember}
          alt="remove from grp"
        />
      </button>
      <Popup trigger={removePopup} setTrigger={setRemoveButtonPopup}>
        <h4>Remove from group</h4>
        <div className="members-list">
          { members.map((member) => (
            <Contact key={member.id} contactId={member.id} groupId={id} contact={member.name} callback={removeFromGroup}>
              {member.name}
            </Contact>
          ))}
        </div>
      </Popup>
      <FormBtn imgSrc={deleteGroup} action="deleteGroup" />
      <FormBtn imgSrc={leaveGroup} action="leaveGroup" />
    </div>
  );
}
