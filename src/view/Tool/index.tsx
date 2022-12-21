import React, { useState } from 'react';
import TabComponent from '@shared/components/TabsComponent';
import './style.scss';
import { addDoc, collection } from 'firebase/firestore';
import FirebaseConfig from 'src/firebase/FirebaseConfig';
import UploadWidget from './CloundynaryWidget';

const Toolpage = () => {
  const [id, setId] = useState<number>(1);

  const randomNumber = Math.floor(Math.random() * 100);

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const rndInt = randomIntFromInterval(1000, 9999);

  const validity =
    randomNumber < 25
      ? 'Mới'
      : randomNumber > 25 && randomNumber < 50
      ? 'Đã phê duyệt'
      : randomNumber > 50 && randomNumber < 75
      ? 'Bị từ chối'
      : 'Đã phê duyệt';

  const ownership =
    randomNumber < 50
      ? 'Người biểu diễn'
      : randomNumber > 50 && randomNumber < 75
      ? 'Nhà sản xuất'
      : 'Người biểu diễn \n Nhà sản xuất';

  const addData = async () => {
    try {
      const docRef = await addDoc(collection(FirebaseConfig.fbDB, 'authorized_works'), {
        id: id,
        name: 'Gorgeous Wooden Bike',
        code: 'VNA ' + rndInt,
        singer: 'Vương Anh Tú',
        author: 'Vương Phong',
        date_created: '01/12/2020 15:53:13',
        status: validity,
      });

      setId(prev => prev + 1);

      console.log('Document written ID: ', docRef.id);
    } catch (error) {
      console.log('Error add Doc:', error);
    }
  };

  const onChange = (key: string) => {};

  function handleOnUpload(error, result, widget) {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
  }

  const tagTwo = (
    <>
      <UploadWidget onUpload={handleOnUpload}>
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return <button onClick={handleOnClick}>Upload an Image</button>;
        }}
      </UploadWidget>
      <img id="uploadedimage" src=""></img>
    </>
  );

  const tabItem = [
    {
      label: 'Tool 1',
      key: '1',
      children: (
        <span className="text-dark">
          <button onClick={addData}>ADD 1 DOC</button>
        </span>
      ),
    },
    {
      label: 'Tool 2',
      key: '2',
      children: <div className="text-dark">{tagTwo}</div>,
    },
  ];

  return (
    <div className="toolpage">
      <TabComponent defaultActiveKey="1" onChange={onChange} items={tabItem} />
    </div>
  );
};

export default Toolpage;
