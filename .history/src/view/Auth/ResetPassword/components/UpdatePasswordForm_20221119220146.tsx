import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useSingleAsync } from '@hook/useAsync';
import { useAltaIntl } from '@hook/useTranslate';
import authenticationPresenter from '@modules/authentication/presenter';
import RenderError from '@view/Auth/components/RenderError';
import { IUpdatePasswordForm } from '@view/Auth/interface';
import { useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import FirebaseConfig from 'src/firebase/FirebaseConfig';

const UpdatePasswordForm: React.FC<IUpdatePasswordForm> = props => {
  const history = useNavigate();
  const { formatMessage } = useAltaIntl();
  const { resetPass } = authenticationPresenter;
  const resetPasswordCall = useSingleAsync(resetPass);
  const [param, setParam] = useSearchParams();

  console.log(param.get('mode'));
  console.log(param.get('oobCode'));

  const [errorStatus, setErrorStatus] = useState('');
  const onSubmitResetPassword = async values => {
    // resetPasswordCall?.execute(values, props.recoveryToken).then(() => {
    //   history('/login');
    // });
    if (values.accountPassword === values.confirmPassword) {
      let oobCode: string = param.get('oobCode');

      confirmPasswordReset(FirebaseConfig.auth, oobCode, values.accountPassword).then(
        () => {
          console.log('Change password successfully!! ');
          history('/');
        },
      );
    }

    // history('/login');
  };

  const onFinishFailed = () => {
    setErrorStatus('');
  };

  return (
    <div className="main-form auth-form">
      <h3 className="main-title">{formatMessage('reset.password.title')}</h3>
      <div className="content-form">
        <Form
          name="resetPassword"
          layout="vertical"
          onFinish={onSubmitResetPassword}
          onFinishFailed={onFinishFailed}
          requiredMark={false}
        >
          <Form.Item
            label={formatMessage('auth.password.new')}
            name="accountPassword"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder={formatMessage('auth.password.new')} />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={formatMessage('auth.password.confirm')}
            dependencies={['accountPassword']}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, passwordConfirm) {
                  if (!passwordConfirm || getFieldValue('accountPassword') === passwordConfirm) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(formatMessage('auth.password.not.match')));
                },
              }),
            ]}
          >
            <Input.Password placeholder={formatMessage('auth.password.confirm')} />
          </Form.Item>
          {errorStatus && <RenderError errorStatus={errorStatus} />}
          <Button htmlType="submit" className="normal-button">
            {formatMessage('common.button.accept')}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
