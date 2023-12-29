import React from 'react';
import addContact from 'Assets/add-contact.svg';
import group from 'Assets/group.svg';
import skype from 'Assets/skype.svg';
import search from 'Assets/magnifying-glass.svg';
import Tab from './Tab';
import './style.scss';

export default function TabsAndDropdowns() {
  return (
    <div className="tabs-container">
      <Tab to="/addContact" imgSrc={addContact} name="Add Contact" />
      <Tab to="/createGroup" imgSrc={group} name="Create Group" />
      <Tab imgSrc={search} name="Join Group" />
      <Tab imgSrc={skype} name="Join Channel" />
    </div>
  );
}
