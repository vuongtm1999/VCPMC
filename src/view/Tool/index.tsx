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

  const rndInt = randomIntFromInterval(40000, 99999);

  const validity =
    randomNumber < 25
      ? 'Mới'
      : randomNumber > 25 && randomNumber < 50
      ? 'Đã phê duyệt'
      : randomNumber > 50 && randomNumber < 75
      ? 'Bị từ chối'
      : 'Đã phê duyệt';

  const status =
    randomNumber < 50
      ? 'Còn thời hạn'
      : 'Đã hết hạn'

  const expiration_date = status ? '25/11/2021' : '07/03/2019'


  const addData = async () => {
    try {
      const docRef = await addDoc(collection(FirebaseConfig.fbDB, 'record'), {
        id: id,
        name: 'Gorgeous Wooden Bike',
        code: 'KRA' + rndInt,
        name_record: 'Sleek Granite Ball',
        time: '03:00',
        singer: 'Lisa',
        author: 'Lisa',
        category: 'Ballad',
        format: 'audio',
        status: status,
        expiration_date: expiration_date
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
