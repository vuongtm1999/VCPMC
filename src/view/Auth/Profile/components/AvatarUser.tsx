import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { imgAvatar } from '@shared/assets/images';
import { useSelector } from 'react-redux';
import { UserSelector } from '@modules/authentication/profileStore';
import UploadWidget from '@view/Tool/CloundynaryWidget';
interface IAvatar {
  disabled?: boolean;
  chooseFile: (file: any) => void;
}
const AvatarUser: React.FC<IAvatar> = props => {
  const { disabled, chooseFile } = props;
  const [imgUrl, setImgUrl] = useState<any>(null);
  const { user } = useSelector(UserSelector);

  // console.log(imgUrl);

  useEffect(() => {
    if (disabled) {
      setImgUrl(user?.avatar);
    }
  }, [user, disabled]);

  function handleOnUpload(error, result, widget) {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }

    chooseFile(result.info.secure_url);
    setImgUrl(result.info.secure_url);
  }

  return (
    <div className="avatar__box">
      <img
        alt="avatar"
        className=""
        src={
          imgUrl
            ? imgUrl === null || typeof imgUrl === 'string'
              ? imgUrl
              : URL.createObjectURL(imgUrl)
            : imgAvatar
        }
      />
      <Form.Item name="avatar" hidden={true}>
        <Input hidden={true} />
      </Form.Item>
      {disabled !== true && (
        <div className="button-icon-upload">
          <label htmlFor="input-media">
            <CameraOutlined hidden={disabled} />
          </label>
          <UploadWidget onUpload={handleOnUpload}>
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return <button className="d-none" id="input-media" onClick={handleOnClick}>Upload an Image</button>;
            }}
          </UploadWidget>
          {/* <input
            hidden
            onChange={e => {
              const media: any = e.target.files ? e.target.files[0] : null;
              setImgUrl(media);
              chooseFile(media);
            }}
            disabled={disabled}
            type="file"
            id="input-media"
          /> */}
        </div>
      )}
      <div className="account-name">
        <p>{user?.userFullName ? user?.userFullName : 'null'}</p>
      </div>
    </div>
  );
};

export default React.memo(AvatarUser);
