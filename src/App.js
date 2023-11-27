import React from "react";
import { useAuth } from "./components/UserContext";
import LoginButton  from './components/Buttons/LoginButton';
import MainWindow from "./components/MainWindow/index";
import './css/style.css';

export default function App(){
    const { currentUser } = useAuth();

    return (
        <div className="App">
                {currentUser ? <MainWindow /> : <LoginButton />}
        </div>
    )
}
