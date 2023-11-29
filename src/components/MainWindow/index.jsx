import React, { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Header from './Header/index.js';
import Profile from './ProfileAndOptions/Profile/index.js';
import Options from './ProfileAndOptions/Options/index.js';
import ContactList from './ContactList/index.js';
import ContactInfo from './ContactInfo';
import Chat from './Chat/index';
import NewMessageForm from './NewMessageForm/index';
import LogoutButton from '../Buttons/LogoutButton.jsx';
import './style.scss';

export default function MainWindow() {
  const [selectedContact, setSelectedContact] = useState();

  return (
    <>
      <div className="main-container">
        <Header />
        <PanelGroup direction="horizontal">
          <Panel className="left-container" minSizePercentage={20} defaultSizePercentage={25}>
            <div className="profileAndOptions">
              <Profile />
              <Options />
            </div>
            <ContactList onContactClick={setSelectedContact} />
          </Panel>
          <PanelResizeHandle className="resizeHandler" />
          <Panel className="right-container" minSizePercentage={60}>
            <ContactInfo contact={selectedContact} />
            <Chat />
            <NewMessageForm />
          </Panel>
        </PanelGroup>
      </div>
      <LogoutButton />
    </>
  );
}
