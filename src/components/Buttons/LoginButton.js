import React from 'react';
import { logIn } from '../../firebase-utils';
import './style.scss';

export default function LoginButton() {
  function handleSignIn() {
    logIn();
  }
  return (
    <button type="button" className="Button" onClick={handleSignIn}>Sign in with Google</button>
  );
}
