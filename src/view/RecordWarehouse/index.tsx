import ISelect from '@core/select';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import CircleLabel from '@shared/components/CircleLabel';
import EditIconComponent from '@shared/components/EditIconComponent';
import InformationIconComponent from '@shared/components/InformationIcon';
import SelectAndLabelComponent, {
  ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import useTable from '@shared/components/TableComponent/hook';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Key, useEffect, useState } from 'react';
import { IModal } from './interface';
import TableMode from './TableMode';

const dataTable = require('./data.json');

function RecordWarehouse() {
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


  return (
    <div className="recordpage">
      <TableMode />
      <RightMenu arrayAction={arrayAction} />
    </div>
  );
}

export default RecordWarehouse;
