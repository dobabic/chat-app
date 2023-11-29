import React from 'react';
import Tab from './Tab';
import Dropdown from './Dropdown';
import './style.scss';

import chat from '../../../../assets/chat.svg';
import contact from '../../../../assets/contact.svg';
import skype from '../../../../assets/skype.svg';
import search from '../../../../assets/magnifying-glass.svg';

export default function TabsAndDropdowns() {
  return (
    <div className="options">
      <div className="tabs-container">
        <Tab imgSrc={chat} name="Chats" />
        <Tab imgSrc={contact} name="Calls" />
        <Tab imgSrc={search} name="Contacts" />
        <Tab imgSrc={skype} name="Today" />
      </div>
      <div className="dropdowns-container">
        <Dropdown imgSrc={chat} text="Meet Now" />
        <Dropdown imgSrc={contact} text="New Chat" />
      </div>
    </div>
  );
}
