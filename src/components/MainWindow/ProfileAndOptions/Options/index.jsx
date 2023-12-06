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
