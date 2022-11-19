import { IRouter } from '@routers/interface';

export const routerResetPassword: IRouter = {
  path: '/reset-password',
  loader: import('./index'),
  exact: true,
};
