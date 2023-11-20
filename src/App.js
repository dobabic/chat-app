import React from "react";
import { UserContextProvider, useAuth } from "./components/UserContext";
import LoginButton  from './components/Buttons/LoginButton';
import MainWindow from "./components/MainWindow/index";
import './css/style.css';

function App(){
    const { currentUser } = useAuth();

    return (
        <div className="App">
                {currentUser ? <MainWindow /> : <LoginButton />}
        </div>
    )
}


//index.js, App.js 
export default function AboveApp() {

    return(
        <UserContextProvider>
            <App/>
        </UserContextProvider>
    )
}