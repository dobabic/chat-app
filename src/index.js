import React from 'react';
import { createRoot } from 'react-dom/client';
import { UserContextProvider } from './components/UserContext';
import App from './App';
import './scss/style.scss';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
);
