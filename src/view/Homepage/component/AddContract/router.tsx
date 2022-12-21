import { IRouter } from '@routers/interface';
import { UilFileGraph } from '@iconscout/react-unicons';
import React from 'react';

export const routerAddContract: IRouter = {
  path: '/contract/authorized/add',
  loader: import('./index'),
  exact: true,
  name: 'homepage.manage.contract.add', //translate here for breadcrumb and sidebar
};