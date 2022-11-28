import viVN from 'antd/lib/locale/vi_VN';

import auth from './auth';
import common from './common';
import Form from './form';
import homepage from './homepage';
import accounts from './accounts';
import pageError from './pageError';
import roles from './roles';
import server from './server';
import table from './table';

export default {
  ...viVN,
  ...common,
  ...server,
  ...auth,
  ...pageError,
  ...roles,
  ...homepage,
  ...accounts,
  ...table,
  Form,
};
