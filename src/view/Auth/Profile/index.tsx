import './style.scss';

import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import store from '@core/store/redux';
import { useSingleAsync } from '@hook/useAsync';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import { RootState } from '@modules';
import authenticationPresenter from '@modules/authentication/presenter';
import profileStore from '@modules/authentication/profileStore';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { useAltaIntl } from '@shared/hook/useTranslate';

import AvatarUser from './components/AvatarUser';
import ModalChangePassWord from './components/ModalChangePassWord';
import { routerViewProfile } from './router';
import { signOut } from 'firebase/auth';
import FirebaseConfig from 'src/firebase/FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import CheckIcon from '@assets/icon/Check';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from 'moment';

dayjs.extend(customParseFormat);

const UserProfile = () => {
  const history = useNavigate();
  const [form] = Form.useForm();
  const { formatMessage } = useAltaIntl();
  const [isVisible, setIsVisible] = useState(false);
  const [isDisableForm, setIsDisableForm] = useState(true);
  const user = useSelector((state: RootState) => state.profile.user);
  const updateAccounts = useSingleAsync(authenticationPresenter.updateProfile);

  // console.log(user?.birthDay);

  const showModal = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    if (user != null) {
      setIsDisableForm(true);
      form.setFieldsValue(user);
    }
  }, [form, user]);

  const arrayAction: IArrayAction[] = [
    {
      iconType: 'edit',
      name: 'common.edit',
      handleAction: () => setIsDisableForm(false),
    },
    {
      iconType: 'key',
      name: 'common.change.password',
      handleAction: () => showModal(),
    },
    {
      iconType: 'logOut',
      name: 'common.logout',
      handleAction: () => {
        DeleteConfirm({
          title: formatMessage('common.logout.title'),
          content: formatMessage('common.logout.content'),
          handleOk: async () => {
            await signOut(FirebaseConfig.auth);
            store.dispatch(profileStore.actions.logOut());

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            // store.dispatch(removeProfile()), history('/login');
          },
        });
      },
    },
  ];

  const chooseFile = (file: any) => {
    form.setFieldsValue({ avatar: file });
  };

  const onUpdateProfile = (values: any) => {

    if (values) {
      const userDoc = doc(FirebaseConfig.fbDB, 'Users', 'WoYxUFCBRvSqWkz9lUxCAkvl5352');

      updateDoc(userDoc, {
        firstName: values.firstName,
        lastName: values.lastName,
        birthDay: values.birthDay,
        numberPhone: values.numberPhone,
      })
        .then(() => console.log('Successs'))
        .catch(error => console.log(error));
    }

    setIsDisableForm(true);

    // if (values) {
    //   updateAccounts.execute(values).then(() => {
    //     authenticationPresenter.getProfile().then(() => {
    //       setIsDisableForm(true);
    //     });
    //   });
    // }
  };

  return (
    <div>
      {/* <div className="all-page-component">
        <div className="w-100 d-flex flex-row-reverse">
          <HeaderComponent />
        </div>
      </div> */}
      <div className="profile-page">
        <MainTitleComponent title="Thông tin cơ bản" />
        {/* <MainTitleComponent breadcrumbs={routerViewProfile} /> */}
        <div className="main-component">
          <div className="profile-user__box">
            <Form
              name="userProfileForm"
              initialValues={user}
              layout="vertical"
              requiredMark={false}
              form={form}
              onFinish={onUpdateProfile}
              onResetCapture={() => {
                setIsDisableForm(true);
              }}
              id="userProfileForm"
            >
              <Row className="profile-form__box" justify="start">
                <Col span={6} className="profile-avatar">
                  <AvatarUser disabled={isDisableForm} chooseFile={chooseFile} />
                </Col>
                <Col span={12}>
                  <div className="main-form">
                    <Row justify="space-between">
                      <Col span={11}>
                        <Form.Item
                          label={formatMessage('accounts.firstName')}
                          name="firstName"
                          rules={[
                            {
                              required: true,
                            },
                            {
                              max: 99,
                              whitespace: true,
                            },
                          ]}
                        >
                          <Input
                            disabled={isDisableForm}
                            placeholder={formatMessage('accounts.firstName')}
                            maxLength={100}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          label={formatMessage('accounts.lastName')}
                          name="lastName"
                          rules={[
                            {
                              required: true,
                            },
                            {
                              max: 99,
                              whitespace: true,
                            },
                          ]}
                        >
                          <Input
                            disabled={isDisableForm}
                            placeholder={formatMessage('accounts.lastName')}
                            maxLength={100}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={11}>
                        <Form.Item
                          label={formatMessage('accounts.birthDay')}
                          name="birthDay"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          valuePropName="moment"
                        >
                          <DatePicker showTime disabled={isDisableForm} defaultValue={ user?.birthDay ? moment(user?.birthDay, 'DD/MM/YYYY') : moment() } format="DD/MM/YYYY" />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          label={formatMessage('accounts.numberPhone')}
                          name="numberPhone"
                          rules={[
                            {
                              required: true,
                            },
                            {
                              max: 99,
                              whitespace: true,
                            },
                          ]}
                        >
                          <Input
                            disabled={isDisableForm}
                            placeholder={formatMessage('accounts.numberPhone')}
                            maxLength={100}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      label={formatMessage('accounts.account')}
                      name="email"
                      rules={[
                        {
                          required: true,
                        },
                        {
                          max: 99,
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input
                        disabled={true}
                        placeholder={formatMessage('accounts.email')}
                        maxLength={100}
                      />
                    </Form.Item>
                    <Form.Item
                      label={formatMessage('accounts.email')}
                      name="email"
                      rules={[
                        {
                          required: true,
                        },
                        {
                          max: 99,
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input
                        disabled={true}
                        placeholder={formatMessage('accounts.email')}
                        maxLength={100}
                      />
                    </Form.Item>
                    <Row>
                      <Col span={11}>
                        <Form.Item
                          label={formatMessage('accounts.role')}
                          name="role"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input disabled={true} placeholder={formatMessage('accounts.role')} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Form>
            <RightMenu arrayAction={arrayAction} />
          </div>
          <ModalChangePassWord isModalVisible={isVisible} setIsModalVisible={setIsVisible} />

          <div className="button-center__box profile-button-update">
            {!isDisableForm && (
              <>
                <Button className="cancel-button mx-5" onClick={() => setIsDisableForm(true)}>
                  {formatMessage('common.cancel')}
                </Button>
                <Button
                  type="primary"
                  className="normal-button"
                  htmlType="submit"
                  form="userProfileForm"
                  loading={updateAccounts?.status === 'loading'}
                >
                  {formatMessage('common.save')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserProfile);
