import { IRouter } from '@routers/interface';

export const routerTest: IRouter = {
  path: '/test',
  loader: import('./index'),
  exact: true,
  name: 'test', //translate here for breadcrumb and sidebar

};
