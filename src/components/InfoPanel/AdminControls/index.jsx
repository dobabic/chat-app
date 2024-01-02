import React from 'react';
import './style.scss';
import addMember from 'Assets/add-member.svg';
import removeMember from 'Assets/remove-member.svg';
import deleteGroup from 'Assets/delete-group.svg';
import leaveGroup from 'Assets/leave-group.svg';
import Tab from '../../MainWindow/ProfileAndOptions/Options/Tab';

export default function AdminControls() {
  return (
    <div className="admin-controls">
      <Tab to="/" imgSrc={addMember} />
      <Tab to="/" imgSrc={removeMember} />
      <Tab to="/" imgSrc={deleteGroup} />
      <Tab to="/leaveGroup" imgSrc={leaveGroup} />
    </div>
  );
}
