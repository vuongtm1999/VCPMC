import { IRouter } from '@routers/interface';
import { UilFileGraph } from '@iconscout/react-unicons';
import React from 'react';

export const routerHomepage: IRouter = {
  path: '/',
  loader: import('./index'),
  exact: true,
  name: 'homepage.name', //translate here for breadcrumb and sidebar
  menu: {
    icon: <UilFileGraph size="24" className="icon-feather red-icon" />,
    'exact': true,
    activePath: /home/i,
    'hideInNavbar': false,
    content: 'Test',
  },
};
