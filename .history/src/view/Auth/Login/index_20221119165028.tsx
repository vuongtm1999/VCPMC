import '../styles.scss';
import './loginStyle.scss';

import React from 'react';

import AuthLayout from '../components/AuthLayout';
import MyLogin from './component/MyLogin';

const Login = () => {

  return (
    <>
      <div className="my-form">
        <AuthLayout>
          <MyLogin />
        </AuthLayout>
      </div>
    </>
  );
};
export default Login;
