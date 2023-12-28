import React from 'react';
import chat from 'Assets/chat.svg';
import contact from 'Assets/contact.svg';
import skype from 'Assets/skype.svg';
import search from 'Assets/magnifying-glass.svg';
import Tab from './Tab';
import Dropdown from './Dropdown';
import './style.scss';

export default function TabsAndDropdowns() {
  return (
    <div className="options">
      <div className="tabs-container">
        <Tab to="/addContact" imgSrc={contact} name="Add Contact" />
        <Tab to="/createGroup" imgSrc={chat} name="Create Group" />
        <Tab imgSrc={search} name="Join Group" />
        <Tab imgSrc={skype} name="Join Channel" />
      </div>
      <div className="dropdowns-container">
        <Dropdown imgSrc={chat} text="Meet Now" />
        <Dropdown imgSrc={contact} text="New Chat" />
      </div>
    </div>
  );
}
