import { IRouter } from '@routers/interface';
import { UilFileGraph } from '@iconscout/react-unicons';
import React from 'react';

export const routerHomepage: IRouter = {
  path: '/contract/authorized',
  loader: import('./index'),
  exact: true,
  name: 'homepage.manage.contract', //translate here for breadcrumb and sidebar
  menu: {
    'exact': true,
    activePath: /contract/i,
    'hideInNavbar': false,
  },
};

export const detailAuthContract: IRouter = {
  path: '/authorized-contract/:contractId',
  loader: import('./component/DetailAuthContract/index'),
  exact: true,
  name: 'homepage.manage.contract.authorized.detail', //translate here for breadcrumb and sidebar
};

export const routerHomepageExploitation: IRouter = {
  path: '/contract/exploitation',
  loader: import('./ExploitationPage'),
  exact: true,
  name: 'homepage.manage.contract.exploitation', //translate here for breadcrumb and sidebar
  menu: {
    'exact': true,
    activePath: /contract/i,
    'hideInNavbar': false,
  },
};

export const routerHomepageDefault: IRouter = {
  path: '/',
  loader: import('./index'),
  exact: true,
  name: 'homepage.name', //translate here for breadcrumb and sidebar
};

export const routerHomepageMain: IRouter = {
  path: '/contract',
  loader: import('./index'),
  exact: true,
  name: 'homepage.manage', //translate here for breadcrumb and sidebar
  menu: {
    icon: <UilFileGraph size="24" className="icon-feather red-icon" />,
    'exact': true,
    activePath: /contract/i,
    'hideInNavbar': false,
    content: 'Test',
  },
  routes: [routerHomepage, routerHomepageExploitation],
};
