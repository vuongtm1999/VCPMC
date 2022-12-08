import AuthorizationContractPresenter from '@modules/authorization-contract/presenter';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { useSingleAsync } from '@shared/hook/useAsync';
import { detailAuthContract, routerHomepage } from '@view/Homepage/router';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { notification, Spin, Row, Col } from 'antd';
import EllipseIcon from '@assets/icon/Ellipse';
import FileIcon from '@assets/icon/FileIcon';
import '../../style.scss';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import { IModal } from '@view/Homepage/interface';
import ModalComponents from '../MainModal/ModalHomepage';
import InfoIcon from '@assets/icon/InfoIcon';
import TabComponent from '@shared/components/TabsComponent';
import InforContract from './InforContract';

function DetailAuthContract() {
  const { contractId } = useParams();
  const { getAuthorizationContract } = AuthorizationContractPresenter;
  const getAuthorizationContractById = useSingleAsync(getAuthorizationContract);
  const [authorizationContract, setAuthorizationContract] = useState(null);

  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });


  const onChange = (key: string) => {
    if (key === '1') {
    } else {
    }
  };

  const tabItem = [
    {
      label: 'Thông tin hợp đồng',
      key: '1',
      children: <InforContract />,
    },
    {
      label: 'Tác phẩm uỷ quyền',
      key: '2',
      children: <span>tab2</span>,
    },
  ];

  return (
    <div className="detail__Authorization-Contract-page">
      <MainTitleComponent
        firstBreadCrum="homepage.manage"
        title={`Chi tiết hợp đồng uỷ quyền bài hát - ${authorizationContract?.number}`}
        breadcrumbs={[routerHomepage, detailAuthContract]}
      />
      <TabComponent defaultActiveKey="1" onChange={onChange} items={tabItem} />
    </div>
  );
}

export default DetailAuthContract;
