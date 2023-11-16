import React, { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import './css/style.css';

import LoginButton  from './components/Buttons/LoginButton';
import MainWindow from "./components/MainWindow/index";

export const UserContext = createContext();


export default function App(){
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if(user) {
                setCurrentUser(user);
            } else {
                console.log(`User: ` + null);
            }
        })
        return unsubscribe
      }, [])

    return (
        <div className="App">
            <UserContext.Provider value={ currentUser }>
                {currentUser ? <MainWindow setCurrentUser={setCurrentUser} /> : <LoginButton />}
            </UserContext.Provider>
        </div>
    )
}
