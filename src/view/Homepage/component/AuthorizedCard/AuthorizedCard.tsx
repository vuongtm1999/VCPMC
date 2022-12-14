import SelectAndLabelComponent, {
  ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import useTable from '@shared/components/TableComponent/hook';
import { IModal } from '@view/Homepage/interface';
// import { useAltaIntl } from '@shared/hook/useTranslate';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import ISelect from '@core/select';
import SearchComponent from '@shared/components/SearchComponent';
import TableComponent from '@shared/components/TableComponent';
import '../../style.scss';
import AuthorizationContractPresenter from '@modules/authorization-contract/presenter';
import EllipseIcon from '@assets/icon/Ellipse';
import { Link, useNavigate } from 'react-router-dom';
import { data } from 'browserslist';
import ModalAuthorizedCard from './ModalAuthorizedCard';

function AuthorizedCard() {
  // const { formatMessage } = useAltaIntl();
  const [search, setSearch] = useState<string>('');
  const [filter, setFilterOption] = useState<any>();
  const navigate = useNavigate();

  const table = useTable();

  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: true,
    data: undefined,
  });

  const handleRefresh = () => {
    table.fetchData({ option: { search: search, filter: { ...filter } } });
  };

  const arrayAction: IArrayAction[] = [
    {
      iconType: 'add',
      handleAction: () => {
        navigate('/contract/authorized/add');
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
      render: (_item: any) => {
        let data;
        switch (_item) {
          case 'new':
            data = (
              <div className="d-flex align-items-center">
                <EllipseIcon className="text-success mr-1" />
                M????i
              </div>
            );
            break;
          case 'validity':
            data = (
              <div className="d-flex align-items-center">
                <EllipseIcon className="text-primary mr-1" />
                C??n th???i h???n
              </div>
            );
            break;
          case 'expires':
            data = (
              <div className="d-flex align-items-center">
                <EllipseIcon className="text-secondary mr-1" />
                H????t ha??n
              </div>
            );
            break;
          case 'cancel':
            data = (
              <div className="d-flex align-items-center">
                <EllipseIcon className="text-danger mr-1" />
                ???? hu???
              </div>
            );
            break;
        }

        return data;
      },
    },
    {
      dataIndex: 'date_created',
      // render: (_item: any, record: any) => (
      //   <div>{ new Date(record.date_created).toLocaleDateString('en-US') }</div>
      // ),
    },
    {
      dataIndex: 'none',
      render: (_item: any, record: any) =>
        record.validity === 'cancel' ? (
          <div>
            <Link className="tag-link" to={`/authorized-contract/${record.id}`}>
              Xem chi ti???t
            </Link>
            <span className="tag-link ml-2" onClick={() => setModal({ data: record.reason, dataEdit: null, isVisible: true, isReadOnly: true })} >
              Ly?? do hu??y
            </span>
          </div>
        ) : (
          <div>
            <Link className="tag-link" to={`/authorized-contract/${record.id}`}>
              Xem chi ti???t
            </Link>
          </div>
        ),
    },
  ];

  const dataStringOwnership: ISelect[] = [
    { label: 'common.all', value: 'all' },
    { label: 'authorization.table.performer', value: 'Ng?????i bi???u di???n' },
    { label: 'authorization.table.producer', value: 'Nh?? s???n xu???t' },
  ];

  const dataStringValidity: ISelect[] = [
    { label: 'common.all', value: 'all' },
    { label: 'M???i', value: 'new' },
    { label: 'C??n th???i h???n', value: 'validity' },
    { label: 'H???t h???n', value: 'expires' },
    { label: 'Hu??y', value: 'cancel' },
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
          placeholder={'T??n h???p ?????ng, s??? h???p ?????ng, ng?????i u??? quy???n...'}
          classNames="mb-0 search-table authorization-contract"
        />
      </div>
      <TableComponent
        apiServices={AuthorizationContractPresenter.getAuthorizationContracts}
        hasStt={true}
        defaultOption={filter}
        translateFirstKey="authorization.contract"
        rowKey={record => record[idChooses]}
        // Filter
        register={table}
        columns={columns}
        // dataSource={dataTable}
        disableFirstCallApi={true}
        className="authorization-contract"
      />

      <RightMenu arrayAction={arrayAction} />

      <ModalAuthorizedCard modal={modal} handleRefresh={handleRefresh} setModal={setModal} />
    </div>
  );
}

export default AuthorizedCard;
