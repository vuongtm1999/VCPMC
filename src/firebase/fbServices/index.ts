import { PaginationEntity } from '@core/pagination/entity';
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc, startAfter, where } from 'firebase/firestore';
import FirebaseConfig from '../FirebaseConfig';

const db = FirebaseConfig.fbDB;

function queryData(paging: any, option: any, collectionName: any) {
  const myCollecttion = collection(db, collectionName);

  let ownershipQuery;
  let validityQuery;
  // only ownership search
  // let searchQuery;

  // Select validity 
  if (option.filter.validity === undefined || option.filter.validity === '0') {
    validityQuery = where('id', '!=', ' ');
  } else {
    if (option.filter.validity === 'validity') {
      validityQuery = where('validity', '==', true);
    }
    if (option.filter.validity === 'expires') {
      validityQuery = where('validity', '==', false);
    }
  }

  // Select ownership
  if (option.filter.ownership === undefined || option.filter.ownership === '0') {
    ownershipQuery = where('id', '!=', ' ');
  } else {
    if (option.filter.ownership === 'Người biểu diễn') {
      ownershipQuery = where('ownership', '==', option.filter.ownership);
    }
    if (option.filter.ownership === 'Nhà sản xuất') {
      console.log(option.filter.ownership === 'Nhà sản xuất');
      ownershipQuery = where('ownership', '==', option.filter.ownership);
    }
  }

  // Queries for firebase
  let q;

  if (ownershipQuery.ma.segments[0] === validityQuery.ma.segments[0] && validityQuery.ga === ownershipQuery.ga) {
    q = query(myCollecttion,
      orderBy('id'),
      startAfter((paging.current - 1) * paging.pageSize),
      ownershipQuery,
    );
  } else {
    q = query(myCollecttion,
      orderBy('id'),
      startAfter((paging.current - 1) * paging.pageSize),
      ownershipQuery,
      validityQuery,
    );
  }

  return q;
}

export const getDatas = async (paging: any, option: any, collectionName: any): Promise<{ data: Array<any>; info: PaginationEntity }> => {
  const q = queryData(paging, option, collectionName);

  const docs = await getDocs(q);
  // const count = await getCountFromServer(deviceCollecttion);

  const data = await docs;
  // const total = await count;

  const customdata = data.docs.map((d) => ({ ...d.data(), id: d.id }));

  console.group([
    '===========================================================================',
    customdata,
    paging,
    option.filter.field,
    option.filter.value,
    '============================================================================',
  ]);
  console.groupEnd();


  return { data: customdata, info: { total: data.size } };
};


export const getSingleData = async (collectionName: string, documentId: string): Promise<{ data: any, status: boolean }> => {

  const docRef = doc(db, collectionName, documentId);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { data: docSnap.data(), status: true };
  } else {
    return { data: 'Data don not exist!!!', status: false };
  }
};

export const addData = async (collectionName: string, data: any): Promise<{ status: boolean }> => {

  const collectionRef = collection(db, collectionName);

  const newDoc = await addDoc(collectionRef, data);

  if (newDoc.id) {
    return { status: true };
  } else {
    return { status: false };
  }

};


export const ChangeData = async (collectionName: string, documentId: string, data: any): Promise<{ status: boolean }> => {

  const docRef = doc(db, collectionName, documentId);

  await setDoc(docRef, data);

  return { status: true };
};