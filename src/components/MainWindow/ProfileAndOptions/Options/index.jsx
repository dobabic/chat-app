import React from 'react';
import addContact from 'Assets/add-contact.svg';
import group from 'Assets/group.svg';
import search from 'Assets/magnifying-glass.svg';
import Tab from './Tab';
import './style.scss';

export default function Tabs() {
  return (
    <div className="tabs-container">
      <Tab to="addContact" imgSrc={addContact} name="Add Contact" />
      <Tab to="createGroup" imgSrc={group} name="Create Group" />
      <Tab imgSrc={search} name="Join Channel" />
    </div>
  );
}
