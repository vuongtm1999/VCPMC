import { IRouter } from '@routers/interface';

export const routerHomepage: IRouter = {
  path: '/',
  loader: import('./index'),
  exact: true,
  name: 'homepage.name', //translate here for breadcrumb and sidebar
  // menu: {
  //   'exact': true,
  //   activePath: /manage\/account/i,
  //   'hideInNavbar': false,
  // },
};
