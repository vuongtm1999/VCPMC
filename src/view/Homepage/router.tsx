import { IRouter } from '@routers/interface';
import { UilFileGraph } from '@iconscout/react-unicons';
import React from 'react';

export const routerHomepage: IRouter = {
  path: '/home-authorized-contract',
  loader: import('./index'),
  exact: true,
  name: 'homepage.manage.contract.authorized', //translate here for breadcrumb and sidebar
  menu: {
    'exact': true,
    activePath: /home/i,
    'hideInNavbar': false,
    content: 'Test',
  },
};

export const routerHomepageExploitation: IRouter = {
  path: '/home-exploitation-contract',
  loader: import('./ExploitationPage'),
  exact: true,
  name: 'homepage.manage.contract.exploitation', //translate here for breadcrumb and sidebar
  menu: {
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
  routes: [routerHomepage, routerHomepageExploitation],
};
