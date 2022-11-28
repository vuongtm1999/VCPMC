import { IRouter } from '@routers/interface';
import { UilFileGraph } from '@iconscout/react-unicons';
import React from 'react';
import { routerViewProfile } from '@view/Auth/Profile/router';

export const routerHomepage: IRouter = {
  path: '/home-contract',
  loader: import('./index'),
  exact: true,
  name: 'homepage.manage.contract', //translate here for breadcrumb and sidebar
  menu: {
    icon: <UilFileGraph size="24" className="icon-feather red-icon" />,
    'exact': true,
    activePath: /home/i,
    'hideInNavbar': false,
    content: 'Test',
  },
};

export const routerHomepageDefault: IRouter = {
  path: '/',
  loader: import('./index'),
  exact: true,
  name: 'homepage.name', //translate here for breadcrumb and sidebar
};

export const routerHomepageMain: IRouter = {
  path: '/home-contract',
  loader: import('./index'),
  exact: true,
  name: 'homepage.manage', //translate here for breadcrumb and sidebar
  menu: {
    icon: <UilFileGraph size="24" className="icon-feather red-icon" />,
    'exact': true,
    activePath: /home/i,
    'hideInNavbar': false,
    content: 'Test',
  },
  routes: [routerHomepage],
};
