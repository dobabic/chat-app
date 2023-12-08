import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { UserContextProvider } from 'Context/UserContext';
import ChatRoute, {
  loader as chatLoader,
  action as chatAction,
} from './routes/chat';
import ChatWindow from './components/MainWindow/ChatWindow';
import Settings from './routes/settings';
import Account from './routes/account';
import App from './App';
import './scss/style.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <ChatWindow /> },
      {
        path: '/messages/:contactId',
        element: <ChatRoute />,
        loader: chatLoader,
        action: chatAction,
      },
    ],
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/settings/account',
    element: <Account />,
  },
]);

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>,
);
