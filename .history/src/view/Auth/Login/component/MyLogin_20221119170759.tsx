import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { useSingleAsync } from '@hook/useAsync';
import { useAltaIntl } from '@hook/useTranslate';
import authenticationPresenter from '@modules/authentication/presenter';
import RenderError from '@view/Auth/components/RenderError';
import { Link } from 'react-router-dom';
import NavLinkBottom from '@view/Auth/components/NavLinkBottom';

const MyLogin = () => {
  const navigate = useNavigate();
  const { formatMessage } = useAltaIntl();
  const { login } = authenticationPresenter;
  const loginByAccount = useSingleAsync(login);
  const [errorStatus, setErrorStatus] = useState('');
  const history = useNavigate();

  const onFinishFailed = () => {
    setErrorStatus('');
  };
  const onSubmitAccount = (values: any) => {
    delete values.remember;
    // document.cookie = `remember_me=${true}; SameSite=None; Secure`;
    loginByAccount
      ?.execute(values)
      ?.then(() => {
        setErrorStatus('');
        setTimeout(() => {
          navigate('/');
        }, 300);
      })
      .catch(() => {
        setErrorStatus(formatMessage('login.account.error'));
      });
  };

  return (
    <>
      <div className="main-form auth-form">
        <div className="content-form">
          <h3 className="main-title">{formatMessage('login.title')}</h3>
          <Form
            name="loginByAccount"
            layout="vertical"
            onFinish={onSubmitAccount}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label={formatMessage('auth.email')}
              name="username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder={formatMessage('auth.email')} />
            </Form.Item>
            <Form.Item
              label={formatMessage('auth.password')}
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password placeholder={formatMessage('auth.password')} />
            </Form.Item>

            {errorStatus && <RenderError errorStatus={errorStatus} />}

            <Form.Item name="remember" valuePropName="checked" className="remember__login">
              <Checkbox>{formatMessage('login.remember')}</Checkbox>
            </Form.Item>

            <Button htmlType="submit" className="normal-button">
              {formatMessage('login.button.account')}
            </Button>
          </Form>

          <NavLinkBottom
            navLink={formatMessage('forgot.password.title')}
            onClick={() => history('/forgot-password')}
          />
          {/* <Link to="/forgot-password" className="forget_pass__link">
              {formatMessage('forgot.password.title')}
            </Link> */}
        </div>
      </div>
    </>
  );
};
export default MyLogin;
