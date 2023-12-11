import React, { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Profile from './ProfileAndOptions/Profile';
import Options from './ProfileAndOptions/Options';
import ContactList from './ContactList';
import LogoutButton from '../Buttons/LogoutButton';
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
            <Outlet context={selectedContact} />
          </Panel>
        </PanelGroup>
      </div>
      <LogoutButton />
    </>
  );
}
