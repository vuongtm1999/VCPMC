import MainTitleComponent from '@shared/components/MainTitleComponent';
import { routerHomepage } from '@view/Homepage/router';
import { routerAddContract } from './router';
import AuthorizationContractPresenter from '@modules/authorization-contract/presenter';
import React, { useState } from 'react';
import { notification, Spin, Row, Col, Upload, Divider, DatePicker } from 'antd';
import { IArrayAction } from '@layout/RightMenu';
import { IModal } from '@view/Homepage/interface';
import '../../style.scss';
import { useAltaIntl } from '@shared/hook/useTranslate';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import FirebaseConfig from 'src/firebase/FirebaseConfig';
import FileIcon from '@assets/icon/FileIcon';
import { UilCloudUpload } from '@iconscout/react-unicons';
import InfoIcon from '@assets/icon/InfoIcon';
import moment from 'moment';
import { useSingleAsync } from '@shared/hook/useAsync';

function AddContract() {
  const { formatMessage } = useAltaIntl();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imageUrls, setImageUrls] = useState([]);
  const { addAuthorizationContract } = AuthorizationContractPresenter;
  const addContract= useSingleAsync(addAuthorizationContract);

  const handleRefresh = () => {};

  function onAddContract(values: any) {
    console.log(values.effective_date.format('DD/MM/YYYY'));

    values = {
      ...values,
      effective_date: values.effective_date.format('DD/MM/YYYY'),
      expire_date: values.expire_date.format('DD/MM/YYYY'),
    };

    addContract.execute(values).then(response => {
      console.log('OK: ', response);
      setIsFormDisabled(true);
    })
    .catch(() => {
      console.log('Đã có lỗi sảy ra!');
    });
  }

  const uploadFile = () => {
    console.log("test", imageUpload);
    if (imageUpload == null) return;
    const imageRef = ref(FirebaseConfig.fbStorage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        setImageUrls(prev => [...prev, { url, name: imageUpload.name }]);
      });
    });
  };

  return (
    <div className="add-contract">
      {contextHolder}
      <MainTitleComponent
        firstBreadCrum="homepage.manage"
        title={`Thêm hợp đồng ủy quyền mới`}
        breadcrumbs={[routerHomepage, routerAddContract]}
      />
      <Form
        labelCol={{ span: 6 }}
        size={isFormDisabled ? 'small' : 'large'}
        name="contractForm"
        layout="horizontal"
        requiredMark={false}
        form={form}
        onFinish={onAddContract}
        // onResetCapture={() => {
        //   setIsDisableForm(true);
        // }}
        id="contractForm"
      >
        <div className="main-form">
          <Row gutter={[5, 0]}>
            <Col span={8}>
              <Row align={'middle'}>
                <Col span={24}>
                  <Form.Item
                    label={formatMessage('contract.detail.number')}
                    name="number"
                    labelCol={{span: 7, offset: 0}}
                    rules={[
                      {
                        required: false,
                      },
                      {
                        max: 99,
                        whitespace: false,
                      },
                    ]}
                  >
                    <Input disabled={isFormDisabled} maxLength={100} />
                  </Form.Item>
                </Col>
              </Row>
              <Row align={'middle'}>
                <Col span={24}>
                  <Form.Item
                    label={formatMessage('contract.detail.name')}
                    labelCol={{span: 7, offset: 0}}
                    name="name"
                    rules={[
                      {
                        required: false,
                      },
                      {
                        max: 99,
                        whitespace: false,
                      },
                    ]}
                  >
                    <Input disabled={isFormDisabled} maxLength={100} />
                  </Form.Item>
                </Col>
              </Row>
              <Row align={'middle'}>
                <Col span={24}>
                  <Form.Item
                    label={formatMessage('contract.detail.effective_date')}
                    name="effective_date"
                    labelCol={{span: 7, offset: 0}}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    valuePropName="moment"
                  >
                    <DatePicker
                      showTime
                      disabled={isFormDisabled}
                      defaultValue={moment()}
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row align={'middle'}>
                <Col span={24}>
                  <Form.Item
                    label={formatMessage('contract.detail.expire_date')}
                    name="expire_date"
                    labelCol={{span: 7, offset: 0}}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    valuePropName="moment"
                  >
                    <DatePicker
                      showTime
                      disabled={isFormDisabled}
                      defaultValue={moment()}
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row align={'middle'}>
                <Col span={24}>
                  <Form.Item
                    label={formatMessage('contract.status')}
                    name="validity"
                    labelCol={{span: 7, offset: 0}}
                    rules={[
                      {
                        required: false,
                      },
                      {
                        max: 99,
                        whitespace: false,
                      },
                    ]}
                  >
                    <Input disabled={isFormDisabled} maxLength={100} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row align={'middle'}>
                <Col span={24}>
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
              </Row>
            </Col>
            <Col span={8}>
              <Row align={'middle'}>
                <Col span={23}>
                  <Row>
                    <div className="d-flex align-items-center">
                      <InfoIcon /> <span className="ml-2 text-form-color">Mức nhuận bút</span>
                    </div>
                  </Row>
                </Col>
              </Row>
              <Row className="text-white" align={'middle'}>
                <Col span={12}>Quyền tác giả:</Col>
                <Col span={12}>0%</Col>
              </Row>
              <Row className="text-white">Quyền liên quan:</Row>
              <Row className="text-white opacity-80" align={'middle'}>
                <Col span={12}>Quyền của người biểu diễn:</Col>
                <Col span={12}>50%</Col>
              </Row>
              <Row className="text-white opacity-80" align={'middle'}>
                <Col span={12}>
                  <Col span={24}>Quyền của nhà sản xuất:</Col>
                  <Col span={24}>(Bản ghi/video)</Col>
                </Col>
                <Col span={12}>50%</Col>
              </Row>
            </Col>
          </Row>
          <Row className="divider-wrapper">
            <Divider />
          </Row>
          <div className="button-center__box">
            {!isFormDisabled && (
              <>
                <Button className="cancel-button mr-5" onClick={() => setIsFormDisabled(true)}>
                  {formatMessage('common.cancel')}
                </Button>
                <Button
                  type="primary"
                  className="normal-button"
                  htmlType="submit"
                  form="contractForm"
                  // onClick={callOnOkForm}
                >
                  {formatMessage('common.save')}
                </Button>
              </>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
}

export default AddContract;
