import React from 'react';
import { useAuth } from './context/UserContext';
import LoginButton from './components/Buttons/LoginButton';
import MainWindow from './components/MainWindow';
import './scss/style.scss';

export default function App() {
  const { currentUser } = useAuth();
  console.log(__dirname);

  return (
    <div className="App">
      {currentUser ? <MainWindow /> : <LoginButton />}
    </div>
  );
}
