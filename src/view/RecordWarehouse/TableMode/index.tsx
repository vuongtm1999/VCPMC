import React, { useEffect } from 'react';
import CircleLabel from '@shared/components/CircleLabel';
import EditIconComponent from '@shared/components/EditIconComponent';
import InformationIconComponent from '@shared/components/InformationIcon';
import TableComponent from '@shared/components/TableComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { Space } from 'antd';
import { Key, useState } from 'react';
import { IModal } from '../interface';
import { ColumnsType } from 'antd/lib/table';
import Layout from '../Layout/index';
import '../style.scss';
import RecordPresenter from '@modules/record/presenter';
import DisplayCardModeIcon from '@assets/icon/DisplayCardMode';
import { NavLink } from 'react-router-dom';
import { UilListUl } from '@iconscout/react-unicons';
import SearchComponent from '@shared/components/SearchComponent';
import SelectAndLabelComponent, { ISelectAndLabel } from '@shared/components/SelectAndLabelComponent';
import ISelect from '@core/select';

const dataTable = require('../data.json');

function TableMode() {
  const { formatMessage } = useAltaIntl();
  const table = useTable();

  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();

  useEffect(() => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
  }, [search, filter, table]);

  const dataFormat: ISelect[] = [
    { label: 'common.all', value: 'all' },
    { label: 'Audio', value: 'audio' },
    { label: 'MP4', value: 'MP4' },
  ];

  const dataStatus: ISelect[] = [
    { label: 'common.all', value: 'all' },
    { label: 'Còn thời hạn', value: 'Còn thời hạn' },
    { label: 'Hết hạn', value: 'Hết hạn' },
  ];

  const dataCate: ISelect[] = [
    { label: 'common.all', value: 'all' },
    { label: 'Ballad', value: 'Ballad' },
  ];


  const arraySelectFilter: ISelectAndLabel[] = [
    { textLabel: 'select.category', name: 'category', dataString: dataCate },
    { textLabel: 'select.format', name: 'format', dataString: dataFormat },
    { textLabel: 'select.expiration_date', name: 'expiration_date', dataString: dataCate },
    { textLabel: 'select.status', name: 'status', dataString: dataStatus },
  ];

  const columns: ColumnsType = [
    {
      dataIndex: 'name_record',
    },
    {
      dataIndex: 'code',
    },
    {
      dataIndex: 'time',
    },
    {
      dataIndex: 'singer',
      // render: () => <CircleLabel text={formatMessage('common.statusActive')} colorCode="blue" />,
    },
    {
      dataIndex: 'author',
    },
    {
      dataIndex: 'category',
    },
    {
      dataIndex: 'format',
    },
    {
      dataIndex: 'expiration_date',
    },
    {
      dataIndex: 'none',
      render: () => <span className="tag-link">Cập nhật</span>,
    },
    {
      dataIndex: 'none',
      render: () => <span className="tag-link">Nghe</span>,
    },
  ];

  const handleRefresh = () => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
  };

  const handleSearch = (searchKey: string) => {
    setSearch(searchKey);
  };

  const onChangeSelectStatus = (name: string | undefined) => (status: any) => {
    if (name && status) {
      setFilterOption((pre: any) => ({ ...pre, [name]: status }));
    }
  };

  return (
    <div className="table-record">
      <div className="layout">
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
            </div>
            <div className="">
              <NavLink
                className={({ isActive }) => (isActive ? 'active-mode' : undefined)}
                to={'/record-warehouse/table-mode'}
                end
              >
                <span className="menu-item">
                  <UilListUl size="32" className="list-icon" />
                </span>
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? 'active-mode' : undefined)}
                to={'/record-warehouse/play-list-mode'}
                end
              >
                <span className="menu-item ml-2">
                  <DisplayCardModeIcon className="play-list-icon" />
                </span>
              </NavLink>
            </div>
          </div>

          <div className="wrapper">
            <div className="wrapper-content">
              <div className="content">
                <TableComponent
                  apiServices={RecordPresenter.getRecords}
                  hasStt
                  defaultOption={filter}
                  translateFirstKey="record"
                  // Filter
                  register={table}
                  columns={columns}
                  // dataSource={dataTable}
                  disableFirstCallApi={true}
                  className="record-wrapper"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableMode;
