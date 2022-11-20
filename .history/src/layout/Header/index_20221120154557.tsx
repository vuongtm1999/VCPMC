import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '@modules';
import UserEntity from '@modules/user/entity';
import { Selector } from '@reduxjs/toolkit';
import { imgAvatar } from '@shared/assets/images';
import ChangeLanguage from '@shared/components/ChangeLanguage';

interface IHeaderComponent {
  profile?: UserEntity;
}

const HeaderComponentSelector: Selector<RootState, IHeaderComponent> = (state: RootState) => {
  return {
    profile: state.profile.user,
  };
};

const HeaderComponent = () => {
  const { profile } = useSelector(HeaderComponentSelector);
  const navigate = useNavigate();

  return (
    <>
      <div className="header-component">
        <div className="header-component__search">
          <ChangeLanguage />
        </div>
        <div className="header-component__dropdown">
          <div className="dropdown__profile__img"
            onClick={() => {
              navigate('/profile');
            }}
          >
            <img alt="img-avatar" className="img-avatar" src={profile?.avatar || imgAvatar} />
          </div>
        </div>
        <div
          className="header-component__identify"
          onClick={() => {
            navigate('/profile');
          }}
        >
          <h4 className="identify__admin">{profile?.userFullName}</h4>
          {/* <p className="identify__place">{profile?.email || 'Unknown'}</p> */}
          <p className="identify__hi">{(profile && profile?.role) || 'Unknown'}</p>
        </div>
      </div>
    </>
  );
};

export default memo(HeaderComponent);
