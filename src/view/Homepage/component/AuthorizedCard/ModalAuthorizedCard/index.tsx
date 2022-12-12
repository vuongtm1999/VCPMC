import { Checkbox, Form, Modal, Button } from 'antd';
import React, { useEffect, useState } from 'react';

import { IFormContent, renderForm } from '@hoc/FormHelper';
import ButtonForm from '@shared/components/ButtonForm';
import { useAltaIntl } from '@shared/hook/useTranslate';

import { IPropsModal } from '../../../interface';

const ModalAuthorizedCard = (props: IPropsModal) => {
  const { modal, setModal, handleRefresh } = props;
  const [form] = Form.useForm();
  const { formatMessage, intl } = useAltaIntl();

  const [typeModal, setTypeModal] = useState<'EDIT' | 'ADD'>('EDIT');
  // JUST FORM
  const formContent: IFormContent[] = React.useMemo<IFormContent[]>(() => {
    return [
      {
        name: 'deviceName',
        label: 'device.deviceName',
        rules: [{ required: true }, { max: 255 }],
        readOnly: modal.isReadOnly,
      },

      {
        label: 'device.deviceCode',
        name: 'deviceCode',
        readOnly: modal.isReadOnly,
      },

      {
        name: 'deviceSimNumber',
        label: 'device.deviceSimNumber',
        readOnly: modal.isReadOnly,
      },
    ];
  }, [modal.isReadOnly]);

  useEffect(() => {
    // if (modal.dataEdit !== null) {
    //   // Call API Get Detail here
    //   setTypeModal('EDIT');
    // } else {
    //   setTypeModal('ADD');
    // }
  }, [modal]);
  const handleOk = value => {
    console.log(value);
    form.submit();
  };
  const handleCancel = () => {
    setModal({ isVisible: false, dataEdit: null });
    // form.resetFields();
    // handleRefresh();
  };
  const onFinish = (value: any) => {
    //thêm xóa sửa value here
    console.debug('value', value);
    if (typeModal === 'EDIT') {
      //call api
      handleCancel();
    } else {
      //call api
      handleCancel();
    }
  };

  const translateFirstKey = 'auth.contract.cancel'; //put your translate here

  return (
    <Modal
      className="main-modal"
      title={
        typeModal === 'EDIT'
          ? modal.isReadOnly
            ? formatMessage(`${translateFirstKey}.update`)
            : formatMessage(`${translateFirstKey}.information`)
          : formatMessage(`${translateFirstKey}.create`) + 'test'
      }
      open={modal.isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <Button onClick={handleCancel} className="normal-button">
              {formatMessage('modal.close')}
        </Button>
      }
      closable={false}
    >
      <div className='info-modal'>Hủy hợp đồng để tạo hợp đồng mới với giá trị và thời hạn lâu hơn.sssssssssssssssssssssssssssssssafa sadfa àdasf</div>
    </Modal>
  );
};

export default ModalAuthorizedCard;
