import React, { PropsWithChildren } from 'react';
import { logoVCPMC } from '@shared/assets/images';
import ChangeLanguage from '@shared/components/ChangeLanguage';

const AuthLayout: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <div className="auth-page">
      <div className="language__box">
        <ChangeLanguage className="label-language-login" />
      </div>
      <div className="main__box">
        <div className="logo__box">
          <img src={logoVCPMC} alt="logo" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default React.memo(AuthLayout);
