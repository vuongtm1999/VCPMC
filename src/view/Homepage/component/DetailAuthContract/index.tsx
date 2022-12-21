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
import InfoIcon from '@assets/icon/InfoIcon';
import TabComponent from '@shared/components/TabsComponent';
import InforContract from './InforContract';
import lodash from 'lodash';
import InfoWork from './InfoWork';

function DetailAuthContract() {
  const { contractId } = useParams();
  const { getAuthorizationContract } = AuthorizationContractPresenter;
  const getAuthorizationContractById = useSingleAsync(getAuthorizationContract);
  const [authorizationContract, setAuthorizationContract] = useState<null | object>(null);
  const [api, contextHolder] = notification.useNotification();
  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });

  const openNotification = (description: string) => {
    api.error({
      message: 'ERROR',
      description: description,
      placement: 'top',
    });
  };

  useEffect(() => {
    getAuthorizationContractById
      .execute(contractId)
      .then(response => {
        setAuthorizationContract(response.data);
        console.log('Get info OK');
      })
      .catch(err => {
        console.log('Get info Error: ', err);
        openNotification('Đã có lỗi xảy ra');
      });
  }, []);

  const onChange = (key: string) => {
    console.log('Change');
    if (key === '1') {
    } else {
    }
  };

  const tabItem = [
    {
      label: 'Thông tin hợp đồng',
      key: '1',
      children: lodash.isEmpty(authorizationContract) ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <InforContract detailData={authorizationContract} />
      ),
    },
    {
      label: 'Tác phẩm uỷ quyền',
      key: '2',
      children: <InfoWork />,
    },
  ];

  return (
    <div className="detail__Authorization-Contract-page">
      {contextHolder}

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
