import React from 'react';
import './style.scss';
import leaveGroup from 'Assets/leave-group.svg';
import Tab from '../../MainWindow/ProfileAndOptions/Options/Tab';

export default function Controls() {
  return (
    <div className="controls">
      <Tab to="/leaveGroup" imgSrc={leaveGroup} />
    </div>
  );
}
