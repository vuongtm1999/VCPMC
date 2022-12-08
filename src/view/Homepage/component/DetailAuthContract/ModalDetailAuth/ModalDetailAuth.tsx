import { Checkbox, Form, Modal, Input } from 'antd';
import React, { useEffect, useState } from 'react';

import { IFormContent, renderForm } from '@hoc/FormHelper';
import ButtonForm from '@shared/components/ButtonForm';
import { useAltaIntl } from '@shared/hook/useTranslate';

import { IPropsModal } from '../../../interface';

const DetailAuthModal = (props: IPropsModal) => {
  const { modal, setModal, handleRefresh } = props;
  const [form] = Form.useForm();
  const { formatMessage, intl } = useAltaIntl();

  const [typeModal, setTypeModal] = useState<'EDIT' | 'ADD'>('ADD');
  // JUST FORM
  const formContent: IFormContent[] = React.useMemo<IFormContent[]>(() => {
    return [
      {
        name: 'reason',
        // label: 'device.deviceName',
        rules: [{ required: true }, { max: 255 }],
        readOnly: modal.isReadOnly,
      },
    ];
  }, [modal.isReadOnly]);

  useEffect(() => {
    if (modal.dataEdit !== null) {
      // Call API Get Detail here
      setTypeModal('EDIT');
    } else {
      setTypeModal('ADD');
    }
  }, [modal]);
  const handleOk = () => {
    console.log('handleOK');
    form.submit();
  };
  const handleCancel = () => {
    setModal({ isVisible: false, dataEdit: null });
    form.resetFields();
    handleRefresh();
  };
  const onFinish = (values: any) => {
    //thêm xóa sửa value here
    console.log('value', values);
    if (typeModal === 'EDIT') {
      //call api
      handleCancel();
    } else {
      //call api
      handleCancel();
    }
  };

  const translateFirstKey = 'auth'; //put your translate here

  return (
    <Modal
      className="main-modal"
      title={
        typeModal === 'EDIT'
          ? modal.isReadOnly
            ? formatMessage(`${translateFirstKey}.information`)
            : formatMessage(`${translateFirstKey}.update`)
          : formatMessage(`${translateFirstKey}.contract.cancel`)
      }
      visible={modal.isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <ButtonForm
          isDisabled={modal.isReadOnly ? true : false}
          formName="form-device"
          nameButtonSubmit={typeModal === 'EDIT' ? 'common.update' : 'common.add'}
          onCancelForm={() => handleCancel()}
        />
      }
      closable={false}
    >
      <Form
        form={form}
        className="main-form" //important
        layout="vertical" //important
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item name="reason">
          <Input.TextArea placeholder='Cho chúng tôi biết lý do bạn muốn huỷ hợp đồng uỷ quyền này...' rows={8} />
        </Form.Item>
        {/* {renderForm(formContent, intl)} */}
        {modal?.dataEdit && (
          <Form.Item
            label={formatMessage(`${translateFirstKey}.accountStatus`)}
            name={'accountStatus'}
          >
            <Checkbox>{formatMessage('common.statusActive')}</Checkbox>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default DetailAuthModal;
