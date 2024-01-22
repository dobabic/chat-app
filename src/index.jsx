import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { UserContextProvider } from 'Context/UserContext';
import MainChat, {
  action as mainChatAction,
} from './routes/mainChat';
import PvtChat, {
  loader as pvtChatLoader,
  action as pvtChatAction,
} from './routes/pvtChat';
import GroupChat, {
  loader as groupChatLoader,
  action as groupChatAction,
} from './routes/groupChat';
import CreateGroup, {
  action as createGroupAction,
} from './routes/createGroup';
import leaveAction from './routes/leaveGroup';
import deleteAction from './routes/deleteGroup';
import addToGroupAction from './routes/addToGroup';
import AddContact, {
  action as addContactAction,
} from './routes/addContact';
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
        element: <MainChat />,
        action: mainChatAction,
      },
      {
        path: '/user/:contactId',
        element: <PvtChat />,
        loader: pvtChatLoader,
        action: pvtChatAction,
      },
      {
        path: 'group/:groupId',
        element: <GroupChat />,
        loader: groupChatLoader,
        action: groupChatAction,
      },
      // workaround for NavLink for url that does not exist
      {
        path: 'group/:groupId/user/*',
        element: <MainChat />,
        loader: groupChatLoader,
        action: groupChatAction,
      },
      {
        path: '/group/:groupId/leaveGroup',
        action: leaveAction,
      },
      {
        path: '/group/:groupId/deleteGroup',
        action: deleteAction,
      },
      {
        path: '/group/:groupId/addToGroup',
        action: addToGroupAction,
      },
      {
        path: '/addContact',
        element: <AddContact />,
        action: addContactAction,
      },
      {
        path: '/createGroup',
        element: <CreateGroup />,
        action: createGroupAction,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/settings/account',
        element: <Account />,
      },
    ],
  },
]);

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>,
);
