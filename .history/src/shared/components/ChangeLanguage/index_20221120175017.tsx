import store from '@core/store/redux';
import settingStore from '@modules/setting/settingStore';
import { Selector } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { LANGUAGE } from '@config/index';
import { Select } from 'antd';
import { RootState } from '@modules';
import StarIcon from '@assets/icon/VieFlatIcon';
import { Option } from 'antd/lib/mentions';

interface IChangeLanguage {
  language: string;
}

const ChangeLanguageSelector: Selector<RootState, IChangeLanguage> = (state: RootState) => ({
  language: state.settingStore.language,
});

const ChangeLanguage: any = () => {
  // JUST LANGUAGE
  const { language } = useSelector(ChangeLanguageSelector);
  const changeLanguage = (pLanguage: string) => {
    const key: any = pLanguage;
    store.dispatch(settingStore.actions.updateLanguage(key));
  };

  return (
    <div className={'select-custom'}>
      <Select defaultValue={language} onChange={changeLanguage}>
        {LANGUAGE.map((item, index) => {
          return (
            <Select.Option key={index + 'option'} value={item.value}>
              <span className="mr-2">{item.label}</span>
              <StarIcon />
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
};

export default memo(ChangeLanguage);
