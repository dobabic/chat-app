import Header from "./Header";
import Profile from "./ProfileAndOptions/Profile";
import Options from "./ProfileAndOptions/Options";
import ContactList from "./ContactList/";
import ContactInfo from "./ContactInfo";
import Chat from "./Chat/index";
import NewMessageForm from "./NewMessageForm/index";
import LogoutButton from "../Buttons/LogoutButton";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import './style.scss';

import { useState } from 'react';

export default function MainWindow({ setCurrentUser }){
    const [selectedContact, setSelectedContact] = useState();

    return(
        <>
            <div className='main-container'>
                <Header/>
                <PanelGroup direction="horizontal">
                    <Panel className="left-container" minSize={25} defaultSize={25}>
                        <div className="profileAndOptions">
                            <Profile />
                            <Options />
                        </div>
                        <ContactList onContactClick={setSelectedContact}/>
                    </Panel>
                    <PanelResizeHandle className="resizeHandler" />
                    <Panel className="right-container"minSize={50}>
                        <ContactInfo contact={selectedContact} />
                        <Chat />    
                        <NewMessageForm />
                    </Panel>
                </PanelGroup>
            </div>
            <LogoutButton setCurrentUser={setCurrentUser}/>
        </>
    )
}
