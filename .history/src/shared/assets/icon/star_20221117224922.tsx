import React from 'react';
import Icon from '@ant-design/icons';

const StarIcon = () => (
  <span style={
    width: '22px',
    height: '22px',
    display: 'flex',
    justify-content: 'center',
    align-items: 'center',
    background-color: '#D80027',
    border-radius: '50%',
    margin-left: 8px,
  } 
  className='star-icon-wrapper'>
    <svg
      width="16"
      height="16"
      viewBox="0 0 12 11"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.99997 0L7.4164 4.20162H12L8.29175 6.79833L9.70817 11L5.99997 8.40324L2.29177 11L3.7082 6.79833L0 4.20162H4.58355L5.99997 0Z"
        fill="#FFDA44"
      />
    </svg>
  </span>
);
export default StarIcon;
