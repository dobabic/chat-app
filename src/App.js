import React from "react";
import { useState, useEffect } from 'react';
import { isUserLogged } from "./firebase-utils";
import './css/style.css';

import LoginButton  from './components/Buttons/LoginButton';
import MainWindow from "./components/MainWindow/index";

export default function App(){
    const [user, setUser] = useState();

    useEffect( () => {
        isUserLogged()
            .then(setUser)
            .catch((err)=> console.log(err));
    }, [])

    return(
        <div className="App">
            {user ? <MainWindow setUser={setUser}/> : <LoginButton setUser={setUser}/>}
        </div>
    )
}
