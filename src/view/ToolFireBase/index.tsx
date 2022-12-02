import React, { useState } from 'react';
import TabComponent from '@shared/components/TabsComponent';
import './style.scss';
import { addDoc, collection } from 'firebase/firestore';
import FirebaseConfig from 'src/firebase/FirebaseConfig';

const Toolpage = () => {
  const [id, setId] = useState<number>(1);

  const randomNumber = Math.floor(Math.random() * 100);

  console.log('randomNumber: ', randomNumber);

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const rndInt = randomIntFromInterval(1, 9999);

  const validity =
    randomNumber < 25
      ? 'Mới'
      : randomNumber > 25 && randomNumber < 50
        ? 'Đang hiệu lực'
        : randomNumber > 50 && randomNumber < 75
          ? 'Hết hiệu lực'
          : 'Đã huỷ';
  
  const ownership =
          randomNumber < 50
            ? 'Người biểu diễn'
            : randomNumber > 50 && randomNumber < 75
              ? 'Nhà sản xuất' : 'Người biểu diễn \n Nhà sản xuất';
           
  const addData = async () => {
    try {
      const docRef = await addDoc(collection(FirebaseConfig.fbDB, 'exploitation-contract'), {
        id: id,
        number: 'HD' + rndInt,
        client: 'Hợp đồng kinh doanh ' + id,
        date_created: '01/04/2021 15:53:13',
        effective_date: '01/04/2021 15:53:13',
        expiration_date: '02/12/2022',
        validity: validity,
      });

      setId(prev => prev + 1);

      console.log('Document written ID: ', docRef.id);
    } catch (error) {
      console.log('Error add Doc:', error);
    }
  };

  const onChange = (key: string) => {
    if (key === '2') {
    } else {
    }
  };

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
      children: <div className="text-light">tool 2</div>,
    },
  ];

  return (
    <div className="toolpage">
      <TabComponent defaultActiveKey="1" onChange={onChange} items={tabItem} />
    </div>
  );
};

export default Toolpage;
