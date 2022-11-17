import React from 'react';
import Icon from '@ant-design/icons';
const backSvg = () => (
  <svg width="12" height="11" viewBox="0 0 12 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.99997 0L7.4164 4.20162H12L8.29175 6.79833L9.70817 11L5.99997 8.40324L2.29177 11L3.7082 6.79833L0 4.20162H4.58355L5.99997 0Z"
      fill="#FFDA44"
    />
  </svg>
);
const BackIcon = props => <Icon component={backSvg} {...props} />;
export default BackIcon;
