import CircleLabel from '@shared/components/CircleLabel';
import SelectAndLabelComponent, { ISelectAndLabel } from '@shared/components/SelectAndLabelComponent';
import { Space } from 'antd';
import React, { Key, useEffect, useState  } from 'react';
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

const dataTable = require('../../data.json');

function MainCard() {
  const { formatMessage } = useAltaIntl();
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);


  const table = useTable();

  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });

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

  useEffect(() => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
  }, [search, filter, table]);

  const idChooses = 'id'; //get your id here. Ex: accountId, userId,...
  const columns: ColumnsType = [
    {
      dataIndex: 'tagName',
    },
    {
      dataIndex: 'lastUpdate',
    },
    {
      dataIndex: 'group',
    },
    {
      dataIndex: 'group',
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

  const dataString: ISelect[] = [{ label: 'common.all', value: undefined }];

  const arraySelectFilter: ISelectAndLabel[] = [
    { textLabel: 'common.keyword', dataString },
    { textLabel: 'common.keyword', dataString },
    { textLabel: 'common.keyword', dataString },
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
            />
          ))}
        </div>
        <div className="d-flex flex-column ">
          <div className="label-select">{'Tu khoa'}</div>
          <SearchComponent
            onSearch={handleSearch}
            placeholder={'Place holder'}
            classNames="mb-0 search-table"
          />
        </div>
      </div>
      <TableComponent
        // apiServices={}
        defaultOption={filter}
        translateFirstKey="homepage"
        rowKey={res => res[idChooses]}
        register={table}
        columns={columns}
        onRowSelect={setSelectedRowKeys}
        dataSource={dataTable}
        disableFirstCallApi={true}
      />

      <RightMenu arrayAction={arrayAction} />

      <ModalComponents modal={modal} handleRefresh={handleRefresh} setModal={setModal} />
    </div>
  );
}

export default MainCard;
