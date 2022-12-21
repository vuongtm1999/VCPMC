import React from 'react';
import Icon from '@ant-design/icons';

const displayCardModeSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M28 18.6667H18.6667V28.0001H28V18.6667Z"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.3333 18.6667H4V28.0001H13.3333V18.6667Z"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M28 4H18.6667V13.3333H28V4Z"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.3333 4H4V13.3333H13.3333V4Z"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const DisplayCardModeIcon = props => <Icon component={displayCardModeSVG} {...props} />;

export default DisplayCardModeIcon;
