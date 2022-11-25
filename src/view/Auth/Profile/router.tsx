import { IRouter } from '@routers/interface';

export const routerViewProfile: IRouter = {
  path: '/profile',
  name: 'Thông tin cơ bản',
  loader: import('./index'),
  exact: true,
  masterLayout: true,
};
