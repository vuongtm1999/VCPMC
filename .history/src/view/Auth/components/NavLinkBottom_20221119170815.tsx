import React from 'react';
import { INavLink } from '../interface';

const NavLinkBottom: React.FC<INavLink> = ({ navLink, onClick }) => {
  return (
    <div className="nav-link__bottom">
      <a className='forget_pass__link' onClick={onClick}>{navLink}</a>
    </div>
  );
};

export default NavLinkBottom;
