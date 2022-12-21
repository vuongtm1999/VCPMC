import SearchComponent from '@shared/components/SearchComponent';
import SelectAndLabelComponent, {
  ISelectAndLabel,
} from '@shared/components/SelectAndLabelComponent';
import { NavLink } from 'react-router-dom';
import React from 'react';
import ISelect from '@core/select';
import { UilListUl } from '@iconscout/react-unicons';
import DisplayCardModeIcon from '@assets/icon/DisplayCardMode';

function Layout({ children }) {
  const handleSearch = (searchKey: string) => {
    // setSearch(searchKey);
  };

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

  const onChangeSelectStatus = (name: string | undefined) => (status: any) => {
    // if (name && status) {
    //   setFilterOption((pre: any) => ({ ...pre, [name]: status }));
    // }
  };

  return (
    <div className='layout'>
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
                <UilListUl size='32' className="list-icon" />
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
            <div className="content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
