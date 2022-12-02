import { Tabs } from 'antd';
import React from 'react';

interface TabProps {
  defaultActiveKey?: string;
  items?: any;
  onChange?: any;
  activeKey?: any;
}

function TabComponent({ items, onChange, defaultActiveKey, ...passProps }: TabProps) {

  return (
    <div className="card-container">
      <Tabs type="card" {...passProps} defaultActiveKey={defaultActiveKey} onChange={onChange} items={items} />
    </div>
  );
}

export default TabComponent;
