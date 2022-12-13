import { Checkbox, Form, Modal, Input } from 'antd';
import React, { useEffect, useState } from 'react';

import { IFormContent, renderForm } from '@hoc/FormHelper';
import ButtonForm from '@shared/components/ButtonForm';
import { useAltaIntl } from '@shared/hook/useTranslate';

import { IPropsModal } from '../../../interface';
import { useSingleAsync } from '@shared/hook/useAsync';
import AuthorizationContractPresenter from '@modules/authorization-contract/presenter';
import { Col, Row } from 'antd/lib/grid';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';
import '../../../style.scss';

const DetailAuthModal = props => {
  const { modal, setModal, handleRefresh, contractId, contractData } = props;
  const [form] = Form.useForm();
  const { formatMessage, intl } = useAltaIntl();
  const { changeAuthorizationContract } = AuthorizationContractPresenter;
  const changeAuthorizationContractById = useSingleAsync(changeAuthorizationContract);

  // console.log(contractData);

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
    console.log('contractData', contractData);

    values = { ...values, ...contractData, validity: 'cancel' };

    changeAuthorizationContractById
      .execute(contractId, values)
      .then(response => {
        console.log('OK: ', response);
      })
      .catch(() => {
        console.log('Đã có lỗi sảy ra');
      });

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
            : formatMessage(`${translateFirstKey}.contract.extend`)
          : formatMessage(`${translateFirstKey}.contract.cancel`)
      }
      open={modal.isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <ButtonForm
          isDisabled={modal.isReadOnly ? true : false}
          formName="contract-cancel"
          nameButtonSubmit={typeModal === 'EDIT' ? 'common.update' : 'common.add'}
          onCancelForm={() => handleCancel()}
        />
      }
      closable={false}
    >
      <Form
        form={form}
        className="main-form" //important
        layout="horizontal" //important
        name="contract-cancel"
        onFinish={onFinish}
      >
        {modal?.dataEdit === null && (
          <Form.Item name="reason">
            <Input.TextArea
              placeholder="Cho chúng tôi biết lý do bạn muốn huỷ hợp đồng uỷ quyền này..."
              rows={8}
            />
          </Form.Item>
        )}
        {/* {renderForm(formContent, intl)} */}
        {modal?.dataEdit && (
          <Row gutter={[48, 0]}>
            <Col span={12}>
              <h3 className="text-white">
                Thời gian gia hạn <span className="text-danger">*</span>
              </h3>
              <div className="text-white">
                <span className="text-white m-0">
                  {formatMessage(`${translateFirstKey}.contract.extend.time.from`)}
                </span>
                <span className="ml-2">
                  {moment(contractData.effective_date, 'DD/MM/YYYY', true)
                    .add(1, 'day')
                    .format('DD/MM/YYYY')}
                </span>
              </div>
              <Form.Item
                label={formatMessage(`${translateFirstKey}.contract.extend.time.to`)}
                name={'expire_date'}
                rules={[
                  {
                    required: true,
                  },
                ]}
                valuePropName="moment"
              >
                <DatePicker
                  showTime
                  defaultValue={
                    contractData.expire_date
                      ? moment(contractData.expire_date, 'DD/MM/YYYY')
                      : moment()
                  }
                  format="DD/MM/YYYY"
                />
              </Form.Item>

              <div className='text-white opacity-70'>
                Lưu ý: Thời gian bắt đầu gia hạn hợp đồng mới được tính sau ngày hết hạn hợp đồng cũ
                một ngày.
              </div>
            </Col>
            <Col span={12}>
              <h3 className="text-white">
                Mức nhuận bút <span className="text-danger">*</span>
              </h3>
              <div className="text-white">
                <span className="text-white m-0">
                  {formatMessage(`${translateFirstKey}.contract.extend.time.from`)}
                </span>
                <span className="ml-2">{}</span>
              </div>
              <Form.Item
                label={formatMessage(`${translateFirstKey}.contract.extend.time.to`)}
                name={'expire_date'}
                rules={[
                  {
                    required: true,
                  },
                ]}
                valuePropName="moment"
              >
                <DatePicker
                  showTime
                  defaultValue={
                    contractData.expire_date
                      ? moment(contractData.expire_date, 'DD/MM/YYYY')
                      : moment()
                  }
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};

export default DetailAuthModal;
