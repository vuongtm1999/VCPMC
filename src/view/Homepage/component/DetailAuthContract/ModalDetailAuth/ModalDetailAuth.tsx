import { Checkbox, Form, Modal, Input } from 'antd';
import React, { useEffect, useState } from 'react';

import { IFormContent, renderForm } from '@hoc/FormHelper';
import ButtonForm from '@shared/components/ButtonForm';
import { useAltaIntl } from '@shared/hook/useTranslate';

import { useSingleAsync } from '@shared/hook/useAsync';
import AuthorizationContractPresenter from '@modules/authorization-contract/presenter';
import { Col, Row } from 'antd/lib/grid';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';
import '../../../style.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { UilCloudUpload } from '@iconscout/react-unicons';
import FileIcon from '@assets/icon/FileIcon';
import Button from 'antd/lib/button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import FirebaseConfig from 'src/firebase/FirebaseConfig';
import { v4 } from 'uuid';

const DetailAuthModal = props => {
  const { modal, setModal, handleRefresh, contractId, contractData } = props;
  const { formatMessage, intl } = useAltaIntl();
  const { changeAuthorizationContract } = AuthorizationContractPresenter;
  const changeAuthorizationContractById = useSingleAsync(changeAuthorizationContract);
  const [checkAll, setCheckAll] = useState(false);
  const [form] = Form.useForm();
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imageUrls, setImageUrls] = useState([]);

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
    console.log('Values', values);

    //Cancel
    if (modal?.dataEdit == null) {
      values = { ...contractData, ...values, validity: 'cancel' };

      changeAuthorizationContractById
        .execute(contractId, values)
        .then(response => {
          console.log('OK: ', response);
          handleCancel();
        })
        .catch(() => {
          console.log('Đã có lỗi sảy ra');
        });
    } else {
      // Extend
      values = { ...contractData, ...values, expire_date: values.expire_date.format('DD/MM/YYYY') };

      changeAuthorizationContractById
        .execute(contractId, values)
        .then(response => {
          console.log('Extend OK: ', response);
          handleCancel();
        })
        .catch(() => {
          console.log('Đã có lỗi sảy ra');
        });
    }
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      form.setFieldsValue({
        RightOfPerformer: '50%',
        RightOfProducer: '50%',
      });
    } else {
      form.setFieldsValue({
        RightOfPerformer: '0%',
        RightOfProducer: '0%',
      });
    }
    
    setCheckAll(e.target.checked);
  };

  const handleOnChangeCopyRight = (e: CheckboxChangeEvent) => {
    if (e.target.checked) { 
      form.setFieldsValue({
        copyright: '0%',
      });
    } else {
      form.setFieldsValue({
        copyright: '0%',
      });
    }
  }

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(FirebaseConfig.fbStorage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        setImageUrls(prev => [...prev, { url, name: imageUpload.name }]);
      });
    });
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

              <div className="text-white opacity-70">
                Lưu ý: Thời gian bắt đầu gia hạn hợp đồng mới được tính sau ngày hết hạn hợp đồng cũ
                một ngày.
              </div>

              <Col span={24} className='p-0 pt-5'>
                <label htmlFor="input-media" className="text-white">
                  Đính kèm tệp:
                  <span className="ml-2 contract-upload-button">
                    <UilCloudUpload /> Tải lên
                  </span>
                </label>
                <input
                  hidden
                  type="file"
                  className="text-white"
                  id="input-media"
                  onChange={event => {
                    setImageUpload(event.target.files[0]);
                  }}
                />
                {imageUrls.map((url, index) => {
                  return (
                    <div>
                      <a key={index} href={url} download>
                        <FileIcon />
                        Tên file(để test)
                      </a>
                    </div>
                  );
                })}
                <div>
                  <Button
                    type="primary"
                    size={'small'}
                    className="normal-button"
                    onClick={uploadFile}
                  >
                    Upload Image
                  </Button>
                </div>
              </Col>
            </Col>
            <Col span={12}>
              <h3 className="text-white">
                Mức nhuận bút <span className="text-danger">*</span>
              </h3>
              <Form.Item
                valuePropName="checked"
                name="copyright"
                wrapperCol={{ span: 24 }}
              >
                <Checkbox onChange={handleOnChangeCopyRight} value="0%">
                  <div className="d-flex justify-content-between">
                    <span>Quyền tác giả</span>
                    <span>0%</span>
                  </div>
                </Checkbox>
              </Form.Item>
              <Checkbox onChange={onCheckAllChange} checked={checkAll}>
                Quyền liên quan:
              </Checkbox>
              <Form.Item
                valuePropName="checked"
                name="RightOfPerformer"
                wrapperCol={{ span: 24, offset: 4 }}
              >
                <Checkbox value="50%">
                  <div className="d-flex justify-content-between">
                    <span>Quyền của người biểu diễn: </span>
                    <span>50%</span>
                  </div>
                </Checkbox>
              </Form.Item>
              <Form.Item
                valuePropName="checked"
                name="RightOfProducer"
                wrapperCol={{ span: 24, offset: 4 }}
              >
                <Checkbox value="50%">
                  <div className="d-flex">
                    <span>Quyền của nhà sản xuất (bản ghi/video)</span> <span>50%</span>
                  </div>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};

export default DetailAuthModal;
