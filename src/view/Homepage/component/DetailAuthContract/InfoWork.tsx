import AuthorizationContractPresenter from '@modules/authorization-contract/presenter';
import React, { Key, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { notification, Spin, Row, Col, Upload, Divider, DatePicker } from 'antd';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import { IModal } from '@view/Homepage/interface';
import '../../style.scss';
import DetailAuthModal from './ModalDetailAuth/ModalDetailAuth';
import { useAltaIntl } from '@shared/hook/useTranslate';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import FirebaseConfig from 'src/firebase/FirebaseConfig';
import FileIcon from '@assets/icon/FileIcon';
import { UilCloudUpload } from '@iconscout/react-unicons';
import InfoIcon from '@assets/icon/InfoIcon';
import moment from 'moment';
import { useSingleAsync } from '@shared/hook/useAsync';
import LinkAudio from './LinkAudioComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { ColumnsType } from 'antd/lib/table';
import CircleLabel from '@shared/components/CircleLabel';
import EditIconComponent from '@shared/components/EditIconComponent';
import InformationIconComponent from '@shared/components/InformationIcon';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import ISelect from '@core/select';
import SelectAndLabelComponent, {
  ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import { Space } from 'antd';
import SearchComponent from '@shared/components/SearchComponent';
import AuthorizedWorkPresenter from '@modules/authorized_works/presenter';
import EllipseIcon from '@assets/icon/Ellipse';

const dataTable = require('../../data.json');

function InfoWork(props) {
  const { detailData } = props;
  const { formatMessage } = useAltaIntl();
  const { contractId } = useParams();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });
  const table = useTable();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();

  const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
  
  const columns: ColumnsType = [
    {
      dataIndex: 'name',
    },
    {
      dataIndex: 'code',
    },
    {
      dataIndex: 'singer',
    },
    {
      dataIndex: 'author',
    },
    {
      dataIndex: 'date_created',
    },
    {
      dataIndex: 'status',
      render: (_item: any, record: any) => {
        let data;
        switch (_item) {
          case 'Mới':
            data = (
              <div className="d-flex align-items-center">
                <EllipseIcon className="text-success mr-1" />
                Mới
              </div>
            );
            break;
          case 'Đã phê duyệt':
            data = (
              <div className="d-flex align-items-center">
                <EllipseIcon className="text-primary mr-1" />
                Đã phê duyệt
              </div>
            );
            break;
          case 'Bị từ chối':
            data = (
              <div className="d-flex align-items-center">
                <EllipseIcon className="text-danger mr-1" />
                Bị từ chối
              </div>
            );
            break;
        }

        return data;
      }
    },
    {
      dataIndex: 'audio',
      render: (_item: any, record: any) => <LinkAudio urlAudio={_item} />
    },
  ];

  const handleRefresh = () => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
    setSelectedRowKeys([]);
  };

  const arrayAction: IArrayAction[] = [
    {
      iconType: 'add',
      handleAction: () => {
        setModal({ dataEdit: null, isVisible: true });
      },
    },
    { iconType: 'share' },
    {
      iconType: 'delete',
      disable: selectedRowKeys?.length === 0,
      handleAction: () => {
        DeleteConfirm({
          content: formatMessage('common.delete'),
          handleOk: () => {
            // call Api Delete here
            handleRefresh();
          },
          handleCancel: () => {},
        });
      },
    },
  ];
  
  const dataString: ISelect[] = [{ label: 'common.all', value: 'all' }];

  const arraySelectFilter: ISelectAndLabel[] = [
    { textLabel: 'common.status', dataString },
  ];

  useEffect(() => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
  }, [search, filter, table]);

  const handleSearch = (searchKey: string) => {
    setSearch(searchKey);
  };

  const onChangeSelectStatus = (name: string | undefined) => (status: any) => {
    if (name && status) {
      setFilterOption((pre: any) => ({ ...pre, [name]: status }));
    }
  };

  return (
    <div className="detail-info-contract">
      {contextHolder}

      {detailData === null ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <div className="text-center">
          <div className="main-card">
            <div className="d-flex flex-row justify-content-md-between mb-3 align-items-end">
              <div className="d-flex flex-row ">
                {arraySelectFilter.map(item => (
                  <SelectAndLabelComponent
                    onChange={onChangeSelectStatus(item.name)}
                    key={item.name}
                    className="margin-select"
                    dataString={item.dataString}
                    textLabel={item.textLabel}
                  />
                ))}
              </div>
              <div className="d-flex flex-column ">
                <SearchComponent
                  onSearch={handleSearch}
                  placeholder={'Tên bản ghi, tên ca sĩ, tác giả,...'}
                  classNames="mb-0 search-table"
                />
              </div>
            </div>
            <TableComponent
              apiServices={AuthorizedWorkPresenter.getAuthorizedWorks}
              hasStt={true}
              defaultOption={filter}
              translateFirstKey="works"
              rowKey={res => res[idChooses]}
              register={table}
              columns={columns}
              onRowSelect={setSelectedRowKeys}
              // dataSource={dataTable}
              disableFirstCallApi={true}
            />
          </div>
        </div>
      )}
      <RightMenu arrayAction={arrayAction} />
      <DetailAuthModal
        contractData={detailData}
        contractId={contractId}
        modal={modal}
        handleRefresh={handleRefresh}
        setModal={setModal}
      />
    </div>
  );
}

export default InfoWork;
