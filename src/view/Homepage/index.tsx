import './style.scss';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { routerHomepage } from './router';
import React, { useState } from 'react';
import TabComponent from '@shared/components/TabsComponent';
import AuthorizedCard from './component/AuthorizedCard/AuthorizedCard';
import ExploitationCard from './component/ExploitationCard/ExploitationCard';

const Homepage = () => {
  // const { formatMessage } = useAltaIntl();
  const [title, setTitle] = useState<string>('Danh sách hợp đồng');

  const onChange = (key: string) => {
    if (key === '1') {
      setTitle('Danh sách hợp đồng');
    } else {
      setTitle('Hợp đồng khai thác');
    }
  };

  const tabItem = [
    {
      label: 'Hợp đồng uỷ quyền',
      key: '1',
      children: <AuthorizedCard />,
    },
    {
      label: 'Hợp đồng khai thác',
      key: '2',
      children: <ExploitationCard />,
    },
  ];

  return (
    <div className="homepage">
      {/* {keyDefault} */}
      <MainTitleComponent title={title} breadcrumbs={routerHomepage} firstBreadCrum="homepage.manage" />

      <TabComponent defaultActiveKey='1' onChange={onChange} items={tabItem} />
    </div>
  );
};

export default Homepage;
