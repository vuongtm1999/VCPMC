import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { useSingleAsync } from '@hook/useAsync';
import authenticationPresenter from '@modules/authentication/presenter';
import { useAltaIntl } from '@shared/hook/useTranslate';

import NavLinkBottom from '../components/NavLinkBottom';
import RenderError from '../components/RenderError';
import AuthLayout from '../components/AuthLayout';
import FirebaseConfig from 'src/firebase/FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const history = useNavigate();
  const { formatMessage } = useAltaIntl();
  const { forgotPass } = authenticationPresenter;
  const forgotPasswordCall = useSingleAsync(forgotPass);
  const [errorStatus, setErrorStatus] = useState('');
  const [checkSuccessEmail, setCheckSuccessEmail] = useState<boolean>(false);

  const onFinishFailed = () => {
    setErrorStatus('');
  };

  const onSubmitEmail = (values: any) => {
    sendPasswordResetEmail(FirebaseConfig.auth, values.email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log('Password reset email sent!');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Erorr:", errorCode, errorMessage);
        // ..
      });
    // forgotPasswordCall
    //   ?.execute(values)
    //   .then(() => {
    //     setCheckSuccessEmail(true);
    //   })
    //   .catch(() => {
    //     setErrorStatus(formatMessage('forgot.password.email.not.exit'));
    //   });
  };

  return (
    <AuthLayout>
      <div className="main-form auth-form">
        <h3 className="main-title">{formatMessage('forgot.password.title')}</h3>
        {!checkSuccessEmail ? (
          <>
            <p className="description">{formatMessage('forgot.password.description')}</p>
            <div className="content-form">
              <Form
                name="forgotPassword"
                layout="vertical"
                onFinish={onSubmitEmail}
                onFinishFailed={onFinishFailed}
                requiredMark={false}
              >
                <Form.Item
                  label={formatMessage('forgot.password.email')}
                  name="email"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: 'email',
                    },
                  ]}
                >
                  <Input placeholder="david@gmail.com" />
                </Form.Item>
                {errorStatus && <RenderError errorStatus={errorStatus} />}
                <Button htmlType="submit" className="normal-button">
                  {formatMessage('forgot.password.button.accept')}
                </Button>
              </Form>
            </div>
          </>
        ) : (
          <div className="status__box">
            <p>{formatMessage('forgot.password.notification')}</p>
          </div>
        )}
      </div>
      <NavLinkBottom
        navLink={formatMessage('link.return.login')}
        onClick={() => history('/login')}
      />
    </AuthLayout>
  );
};
export default ForgotPassword;
