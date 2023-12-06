import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { UserContextProvider } from 'Context/UserContext';
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
        element: <div>Placeholder Text</div>,
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
