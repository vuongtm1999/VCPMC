import React from 'react';

interface ISelect<T = React.Key> {
  value?: string;
  label?: React.ReactNode;
  data?: T;
  icon?: (props: any) => React.ReactElement;
}

export default ISelect;
