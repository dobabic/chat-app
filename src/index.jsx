import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { UserContextProvider } from 'Context/UserContext';
import PvtChat, {
  loader as pvtChatLoader,
  action as pvtChatAction,
} from './routes/pvtChat';
import Chat, {
  loader as mainChatLoader,
  action as mainChatAction,
} from './routes';
import Settings from './routes/settings';
import Account from './routes/account';
import App from './App';
import './scss/style.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Chat />,
        loader: mainChatLoader,
        action: mainChatAction,
      },
      {
        path: '/messages/:contactId',
        element: <PvtChat />,
        loader: pvtChatLoader,
        action: pvtChatAction,
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
