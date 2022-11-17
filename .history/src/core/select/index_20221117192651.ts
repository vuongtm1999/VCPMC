import React from 'react';

interface ISelect<T = React.Key> {
  value?: string | number;
  label?: any;
  data?: T;
}

export default ISelect;
