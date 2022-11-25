import './style.scss';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { routerHomepage } from './router';
import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import MainCard from './component/MainCard/MainCard';
import TabComponent from '@shared/components/TabsComponent';

const Homepage = () => {
  const { formatMessage } = useAltaIntl();
  const [title, setTitle] = useState<string>('Danh sách hợp đồng');

  const onChange = (key: string) => {
    if (key === '2') {
      setTitle('Hợp đồng khai thác');
    } else {
      setTitle('Danh sách hợp đồng');
    }
    console.log(key);
  };

  const tabItem = [
    {
      label: 'Hợp đồng uỷ quyền',
      key: '1',
      children: MainCard(),
    },
    {
      label: 'Hợp đồng khai thác',
      key: '2',
      children: 'Content of Tab Pane 2',
    },
  ];

  return (
    <div className="homepage">
      <MainTitleComponent title={title} breadcrumbs={routerHomepage} />
      <TabComponent defaultActiveKey="1" onChange={onChange} items={tabItem} />
    </div>
  );
};

export default Homepage;
