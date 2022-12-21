import ISelect from '@core/select';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import CircleLabel from '@shared/components/CircleLabel';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import EditIconComponent from '@shared/components/EditIconComponent';
import InformationIconComponent from '@shared/components/InformationIcon';
import SearchComponent from '@shared/components/SearchComponent';
import SelectAndLabelComponent, {
  ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';
import { IModal } from './interface';
import { UilListUl } from '@iconscout/react-unicons';
import PlayListIcon from '@assets/icon/PlayListIcon';
import DisplayCardModeIcon from '@assets/icon/DisplayCardMode';
import TabComponent from '@shared/components/TabsComponent';
import TableRecord from './TableMode';
import { NavLink } from 'react-router-dom';

const dataTable = require('./data.json');

function TablePage() {
  const { formatMessage } = useAltaIntl();
  const table = useTable();

  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();

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

  const handleRefresh = () => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
    setSelectedRowKeys([]);
  };

  const arrayAction: IArrayAction[] = [
    {
      iconType: 'edit',
      name: 'common.mange.approve',
      handleAction: () => {
        setModal({ dataEdit: null, isVisible: true });
      },
    },
  ];

  const dataString: ISelect[] = [
    { label: 'common.all', value: undefined },
    { label: 'tddddadsasesssssssssst', value: 'test' },
  ];

  const arraySelectFilter: ISelectAndLabel[] = [
    { textLabel: 'common.keyword', dataString },
    { textLabel: 'common.keyword', dataString },
    { textLabel: 'common.keyword', dataString },
    { textLabel: 'common.keyword', dataString },
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

  const tabItem = [
    {
      label: <UilListUl />,
      key: '1',
      children: <TableRecord />,
    },
    {
      label: <DisplayCardModeIcon />,
      key: '2',
      children: 'test2',
    },
  ];

  return (
    <div className="recordpage">
      <div className="main-card">
        <h1 className="text-white display-4">Kho bản ghi</h1>
        <div className="d-flex flex-column mb-3">
          <SearchComponent
            onSearch={handleSearch}
            placeholder={'Tên bản ghi, ca sĩ,...'}
            classNames="mb-0 search-table"
          />
        </div>
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

            <NavLink className={(nav) => 'menu-item' || { active: nav.isActive }} to={'/test'} end>
              <span className='menu-item'>Test1</span>
              <span className='menu-item'>Test2</span>
              <span className='menu-item'>Test3</span>
            </NavLink>

          </div>
        </div>

        <TabComponent id="record-tab" defaultActiveKey="1" items={tabItem} />

      </div>

      <RightMenu arrayAction={arrayAction} />
    </div>
  );
}

export default TablePage;
