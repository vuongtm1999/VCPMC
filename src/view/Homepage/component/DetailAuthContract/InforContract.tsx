import AuthorizationContractPresenter from '@modules/authorization-contract/presenter';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { useSingleAsync } from '@shared/hook/useAsync';
import { detailAuthContract, routerHomepage } from '@view/Homepage/router';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { notification, Spin, Row, Col } from 'antd';
import EllipseIcon from '@assets/icon/Ellipse';
import FileIcon from '@assets/icon/FileIcon';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import { IModal } from '@view/Homepage/interface';
import InfoIcon from '@assets/icon/InfoIcon';
import TabComponent from '@shared/components/TabsComponent';
import '../../style.scss';
import DetailAuthModal from './ModalDetailAuth/ModalDetailAuth';

function InforContract() {
  const { contractId } = useParams();
  const { getAuthorizationContract } = AuthorizationContractPresenter;
  const getAuthorizationContractById = useSingleAsync(getAuthorizationContract);
  const [authorizationContract, setAuthorizationContract] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const [modal, setModal] = useState<IModal>({
    isVisible: false,
    dataEdit: null,
    isReadOnly: false,
  });

  const handleRefresh = () => {};

  const openNotification = (description: string) => {
    api.error({
      message: 'ERROR',
      description: description,
      placement: 'top',
    });
  };

  useEffect(() => {
    // getAuthorizationContractById
    //   .execute(contractId)
    //   .then(response => {
    //     setAuthorizationContract(response.data);
    //     console.log(response.data);
    //   })
    //   .catch(() => {
    //     openNotification('Đã có lỗi sảy ra');
    //   });
  }, [authorizationContract]);

  const arrayAction: IArrayAction[] = [
    {
      iconType: 'edit',
      handleAction: () => {
        setModal({ dataEdit: null, isVisible: true });
      },
    },
    { iconType: 'extend' },
    {
      iconType: 'cancel',
      handleAction: () => {
        setModal({ dataEdit: null, isVisible: true });
      },
    },
  ];
  return (
    <div className="detail-info-contract">
      {contextHolder}

      {/* <div className="body__detail">
        {authorizationContract === null ? (
          <div className="text-center">
            <Spin size="large" />
          </div>
        ) : ( */}
      <Row className="ml-2">
        <Col span={10}>
          <Col className="mb-3" span={24}>
            <Row>
              <Col span={6}>
                <span>
                  <strong>Số hợp đồng: </strong>
                </span>
              </Col>
              <Col span={18}>
                <span className="opacity-80">BH123</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={6}>
                <span>
                  <strong>Tên hợp đồng: </strong>
                </span>
              </Col>
              <Col span={18}>
                <span className="opacity-80">Hợp đồng uỷ quyền tác phẩm âm nhạc</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={6}>
                <span>
                  <strong>Ngày hiệu lực: </strong>
                </span>
              </Col>
              <Col span={18}>
                <span className="opacity-80">01/05/2021</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={6}>
                <span>
                  <strong>Ngày hết hạn: </strong>
                </span>
              </Col>
              <Col span={18}>
                <span className="opacity-80">02/06/2021</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={6}>
                <span>
                  <strong>Tình trạng: </strong>
                </span>
              </Col>
              <Col span={18}>
                <EllipseIcon className="text-primary mr-1" />
                <span className="opacity-80">Còn thời hạn</span>
              </Col>
            </Row>
          </Col>
        </Col>
        <Col span={7}>
          <Col className="mb-3" span={24}>
            <Row>
              <Col span={8}>
                <span>
                  <strong>Đính kèm tệp: </strong>
                </span>
              </Col>
              <Col span={16}>
                <div>
                  <FileIcon />
                  <span className="opacity-80">hetthuongcannho.doc</span>
                </div>

                <div className="mt-2">
                  <FileIcon />
                  <span className="opacity-80">hetthuongcannho.doc</span>
                </div>
              </Col>
            </Row>
          </Col>
        </Col>
        <Col span={7}>
          <Col className="mb-3" span={24}>
            <Row>
              <Col span={24}>
                <span>
                  <InfoIcon />
                  <strong className="ml-3 text-lighter-primary">Mức nhuận bút</strong>
                </span>
              </Col>
            </Row>
          </Col>
          <Col className="mb-3" span={24}>
            <Row>
              <Col span={14}>
                <span>
                  <strong>Quyền tác giả: </strong>
                </span>
              </Col>
              <Col span={10}>
                <span className="opacity-80">0%</span>
              </Col>
            </Row>
          </Col>
          <Col className="mb-3" span={24}>
            <Row>
              <Col span={14}>
                <span>
                  <strong>Quyền liên quan: </strong>
                </span>
              </Col>
            </Row>
          </Col>
          <Col className="mb-3" span={24}>
            <Row>
              <Col span={14}>
                <span>
                  <span className="opacity-80">Quyền của người biểu diễn: </span>
                </span>
              </Col>
              <Col span={10}>
                <span className="opacity-80">50%</span>
              </Col>
            </Row>
          </Col>
          <Col className="mb-3" span={24}>
            <Row>
              <Col span={14}>
                <span>
                  <span className="opacity-80">
                    Quyền của nhà sản xuất: <br />
                    (Bản ghi/video)
                  </span>
                </span>
              </Col>
              <Col span={10}>
                <span className="opacity-80">50%</span>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>

      {/* Row 2 */}
      <Row className="wrapper-row-2 ml-2">
        <Col span={24}>
          <span>
            <strong className="text-lighter-primary">Thông tin pháp nhân uỷ quyền</strong>
          </span>
        </Col>
        <Col span={10}>
          <Col className="mb-3" span={24}>
            <Row>
              <Col span={6}>
                <span>
                  <strong>Pháp nhân uỷ quyền: </strong>
                </span>
              </Col>
              <Col span={18}>
                <span className="opacity-80">Cá nhân</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={6}>
                <span>
                  <strong>Tên người uỷ quyền: </strong>
                </span>
              </Col>
              <Col span={18}>
                <span className="opacity-80">Nguyễn Văn A</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={6}>
                <span>
                  <strong>Ngày sinh: </strong>
                </span>
              </Col>
              <Col span={18}>
                <span className="opacity-80">10/01/1984</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={6}>
                <span>
                  <strong>Giới tính: </strong>
                </span>
              </Col>
              <Col span={18}>
                <span className="opacity-80">Nam</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={6}>
                <span>
                  <strong>Quốc tịch: </strong>
                </span>
              </Col>
              <Col span={18}>
                <span className="opacity-80">Việt Nam</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={6}>
                <span>
                  <strong>Số điện thoại: </strong>
                </span>
              </Col>
              <Col span={18}>
                <span className="opacity-80">(+84) 345 678 901</span>
              </Col>
            </Row>
          </Col>
        </Col>
        <Col span={7}>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={10}>
                <span>
                  <strong>Số CMND/ CCCD: </strong>
                </span>
              </Col>
              <Col span={14}>
                <span className="opacity-80">123456789012</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={10}>
                <span>
                  <strong>Ngày cấp: </strong>
                </span>
              </Col>
              <Col span={14}>
                <span className="opacity-80">10/07/2011</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={10}>
                <span>
                  <strong>Nơi cấp: </strong>
                </span>
              </Col>
              <Col span={14}>
                <span className="opacity-80">Tp.HCM, Việt Nam</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={10}>
                <span>
                  <strong>Mã số thuế: </strong>
                </span>
              </Col>
              <Col span={14}>
                <span className="opacity-80">92387489</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={10}>
                <span>
                  <strong>Nơi cư trú: </strong>
                </span>
              </Col>
              <Col span={14}>
                <div className="opacity-80 text-justify w-75">
                  69/53, Nguyễn Gia Trí, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh
                </div>
              </Col>
            </Row>
          </Col>
        </Col>
        <Col span={7}>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={12}>
                <span>
                  <strong>Email: </strong>
                </span>
              </Col>
              <Col span={12}>
                <span className="opacity-80">nguyenvana@gmail.com</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={12}>
                <span>
                  <strong>Tài khoản đăng nhập: </strong>
                </span>
              </Col>
              <Col span={12}>
                <span className="opacity-80">nguyenvana@gmail.com</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={12}>
                <span>
                  <strong>Mật khẩu: </strong>
                </span>
              </Col>
              <Col span={12}>
                <span className="opacity-80">*********</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={12}>
                <span>
                  <strong>Số tài khoản: </strong>
                </span>
              </Col>
              <Col span={12}>
                <span className="opacity-80">1231223312212223</span>
              </Col>
            </Row>
          </Col>
          <Col className="my-3" span={24}>
            <Row>
              <Col span={12}>
                <span>
                  <strong>Ngân hàng: </strong>
                </span>
              </Col>
              <Col span={12}>
                <span className="opacity-80">ACB - Ngân hàng Á Châu</span>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>

      <RightMenu arrayAction={arrayAction} />
      <DetailAuthModal modal={modal} handleRefresh={handleRefresh} setModal={setModal} />
    </div>
  );
}

export default InforContract;
