import { IRouter } from '@routers/interface';


export const routerTool: IRouter = {
  path: '/tool',
  loader: import('./index'),
  exact: true,
  name: 'tool', //translate here for breadcrumb and sidebar
};

