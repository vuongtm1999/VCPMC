import React from 'react';
import Icon from '@ant-design/icons';

const checkSvg = () => (
  <svg width="40" height="40" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_31_2307)">
      <path
        d="M22 42.1668C33.1378 42.1668 42.1667 33.1379 42.1667 22.0002C42.1667 10.8624 33.1378 1.8335 22 1.8335C10.8623 1.8335 1.83337 10.8624 1.83337 22.0002C1.83337 33.1379 10.8623 42.1668 22 42.1668Z"
        stroke="#18E306"
        stroke-width="3.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M32.0833 16.0415L19.4792 28.6457L13.75 22.9165"
        stroke="#18E306"
        stroke-width="3.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_31_2307">
        <rect width="44" height="44" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CheckIcon = (props) => <Icon component={checkSvg} {...props} />;

export default CheckIcon;
