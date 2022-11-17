import React from 'react';

interface ISelect<T = React.Key> {
  value?: React.ReactNode;
  label?: string;
  data?: T;
}

export default ISelect;
