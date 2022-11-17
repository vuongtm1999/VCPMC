import React from 'react';

interface ISelect<T = React.Key> {
  value?: JSX.Element;
  label?: string;
  data?: T;
}

export default ISelect;
