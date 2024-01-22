import React from 'react';
import '../style.scss';
import leaveGroup from 'Assets/leave-group.svg';
import FormBtn from '../FormBtn';

export default function Controls() {
  return (
    <div className="controls">
      <FormBtn imgSrc={leaveGroup} action="leaveGroup" />
    </div>
  );
}
