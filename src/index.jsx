import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { UserContextProvider } from 'Context/UserContext';
import ChatRoute, {
  loader as chatLoader,
} from './routes/chat';
import Settings from './routes/settings';
import Account from './routes/account';
import App from './App';
import './scss/style.scss';
import Chat from './components/MainWindow/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Chat /> },
      {
        path: '/messages/:contactId',
        element: <ChatRoute />,
        loader: chatLoader,
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
