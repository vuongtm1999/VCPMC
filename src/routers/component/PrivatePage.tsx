import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from 'react-router';

import config from '@config/index';
import DefaultLayout from '@layout/index';
// import authenticationPresenter from '@modules/authentication/presenter';
import { TokenSelector } from '@modules/authentication/profileStore';

import { privateRouter } from '../index';
import ShowRouter from './ShowRouter';
import authenticationPresenter from '@modules/authentication/presenter';
import { UIDSelector } from '@core/store/redux';

const PrivatePage: React.FC = () => {
  const { token } = useSelector(TokenSelector);
  const dispatch = useDispatch();
  const { uID } = useSelector(UIDSelector);

  useEffect(() => {
    if (token) {
      authenticationPresenter.getProfile(uID);
    } else {
      window.location.href = config.LOGIN_PAGE;
    }
  }, [token, dispatch]);

  return <Routes>{ShowRouter({ routers: privateRouter, MasterLayout: DefaultLayout })}</Routes>;
};
export default PrivatePage;
