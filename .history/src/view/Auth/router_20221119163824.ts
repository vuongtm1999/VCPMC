import { IRouter } from '@routers/interface';

export const routerMainPublicPage: IRouter = {
  path: '/',
  loader: import('./Login/index'),
  exact: true,
};

export const routerPage: IRouter = {
  path: '/',
  loader: import('./Login/index'),
  exact: true,
};
