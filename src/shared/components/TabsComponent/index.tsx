import { Tabs } from 'antd';
import React from 'react';

function TabComponent({ defaultActiveKey, items, onChange }) {
  return (
    <div className="card-container">
      <Tabs type="card" defaultActiveKey={defaultActiveKey} onChange={onChange} items={items} />
    </div>
  );
}

export default TabComponent;
