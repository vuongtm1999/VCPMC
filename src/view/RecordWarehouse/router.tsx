import PlayListIcon from '@assets/icon/PlayListIcon';
import { IRouter } from '@routers/interface';
import React from 'react';

export const routerRecordWarehouse: IRouter = {
  path: '/record-warehouse/table-mode',
  loader: import('./index'),
  exact: true,
  name: 'record.home', //translate here for breadcrumb and sidebar
  menu: {
    'exact': true,
    activePath: /record-warehouse/i,
    'hideInNavbar': false,
    icon: <PlayListIcon className='text-white' />,
  },
};

// export const routerTableMode: IRouter = {
//   path: '/table-mode',
//   loader: import('./TableMode/index'),
//   exact: true,
//   name: 'record.home', //translate here for breadcrumb and sidebar
// };

export const routerPlayListMode: IRouter = {
  path: '/record-warehouse/play-list-mode',
  loader: import('./PlayListMode/index'),
  exact: true,
  name: 'record.home', //translate here for breadcrumb and sidebar
};
