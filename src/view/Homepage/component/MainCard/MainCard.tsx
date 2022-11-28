import CircleLabel from '@shared/components/CircleLabel';
import SelectAndLabelComponent, {
  ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import { Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import useTable from '@shared/components/TableComponent/hook';
import { IModal } from '@view/Homepage/interface';
import EditIconComponent from '@shared/components/EditIconComponent';
import { useAltaIntl } from '@shared/hook/useTranslate';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import ModalComponents from '../../component/MainModal/ModalHomepage';
import InformationIconComponent from '@shared/components/InformationIcon';
import ISelect from '@core/select';
import SearchComponent from '@shared/components/SearchComponent';
import TableComponent from '@shared/components/TableComponent';
import '../../style.scss';
import AuthorizationContractPresenter from '@modules/authorization-contract/presenter';

const dataTable = require('../../data.json');

function MainCard() {
  const { formatMessage } = useAltaIntl();
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();
  // const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const table = useTable();

  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });

  const handleRefresh = () => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
    // setSelectedRowKeys([]);
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
      // disable: selectedRowKeys?.length === 0,
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

  useEffect(() => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
  }, [search, filter, table]);

  const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
  
  //OK
  const columns: ColumnsType = [
    {
      dataIndex: 'number',
    },
    {
      dataIndex: 'name',
    },
    {
      dataIndex: 'authorized_person',
    },
    {
      dataIndex: 'ownership',
    },
    {
      dataIndex: 'validity',
    },
    {
      dataIndex: 'date_created',
    },
    {
      dataIndex: 'status',
      render: () => <CircleLabel text={formatMessage('common.statusActive')} colorCode="blue" />,
    },
    {
      dataIndex: 'action',
      render: (_item: any, record: any) => (
        <Space>
          <EditIconComponent
            onClick={() => {
              setModal({
                dataEdit: record,
                isVisible: true,
                isReadOnly: false,
              });
            }}
          />
          <InformationIconComponent
            onClick={() => {
              setModal({
                dataEdit: record,
                isVisible: true,
                isReadOnly: true,
              });
            }}
          />
        </Space>
      ),
    },
  ];

  const dataStringOwnership: ISelect[] = [
    { label: 'common.all', value: 'all' },
    { label: 'Người biểu diễn', value: 'performer' },
    { label: 'Nhà sản xuất', value: 'producer' },
  ];

  const dataStringValidity: ISelect[] = [
    { label: 'common.all', value: 'all' },
    { label: 'Mới', value: 'new' },
    { label: 'Còn thời hạn', value: 'validity' },
    { label: 'Hết hạn', value: 'expires' },
    { label: 'Hủy', value: 'Cancel' },
  ];

  const arraySelectFilter: ISelectAndLabel[] = [
    { textLabel: 'common.ownership', name: 'ownership', dataString: dataStringOwnership },
    { textLabel: 'common.validity', name: 'validity', dataString: dataStringValidity },
  ];

  const handleSearch = (searchKey: string) => {
    setSearch(searchKey);
  };

  const onChangeSelectStatus = (name: string | undefined) => (status: any) => {
    if (name && status) {
      setFilterOption((pre: any) => ({ ...pre, [name]: status }));
    }
  };
  return (
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
              classNameSelect={item.name}
            />
          ))}
        </div>
        <SearchComponent
          onSearch={handleSearch}
          placeholder={'Tên hợp đồng, số hợp đồng, người uỷ quyền...'}
          classNames="mb-0 search-table authorization-contract"
        />
      </div>
      <TableComponent
        apiServices={AuthorizationContractPresenter.getAuthorizationContracts}
        hasStt={ true }
        defaultOption={filter}
        translateFirstKey="authorization.contract"
        rowKey={record  => record[idChooses]}
        // Filter
        register={table}
        columns={columns}
        // onRowSelect={setSelectedRowKeys}
        dataSource={dataTable}
        disableFirstCallApi={true}
        className='authorization-contract'
      />

      <RightMenu arrayAction={arrayAction} />

      <ModalComponents modal={modal} handleRefresh={handleRefresh} setModal={setModal} />
    </div>
  );
}

export default MainCard;
