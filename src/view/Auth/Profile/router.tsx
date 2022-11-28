import { IRouter } from '@routers/interface';
import { UilFileGraph } from '@iconscout/react-unicons';
import React from 'react';

export const routerViewProfile: IRouter = {
  path: '/profile',
  name: 'Thông tin',
  loader: import('./index'),
  exact: true,
  masterLayout: true,
  menu: {
    icon: <UilFileGraph size="24" className="icon-feather red-icon" />,
    'exact': true,
    activePath: /profile/i,
    'hideInNavbar': false,
    content: 'Test',
  },
};
