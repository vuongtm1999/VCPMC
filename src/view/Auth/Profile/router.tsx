import { UilTrash } from '@iconscout/react-unicons';
import { IRouter } from '@routers/interface';
import { routerHomepage } from '@view/Homepage/router';
import React from 'react';

export const routerViewProfile: IRouter = {
  path: '/profile',
  name: 'Thông tin cơ bản',
  loader: import('./index'),
  exact: true,
  masterLayout: true,
  menu: {
    icon: <UilTrash size="24" className="icon-feather red-icon" />,
    exact: true,
    activePath: /home/i,
    hideInNavbar: false,
    content: 'Test',
  },
  routes: [routerHomepage],
};
