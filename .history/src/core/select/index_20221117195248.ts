import React from 'react';

interface ISelect<T = React.Key> {
  value?: string | number;
  label?: React.ReactNode;
  data?: T;
}

export default ISelect;
