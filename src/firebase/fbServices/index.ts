import { PaginationEntity } from '@core/pagination/entity';
import { addDoc, collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter } from 'firebase/firestore';
import  FirebaseConfig  from '../FirebaseConfig';

const db = FirebaseConfig.fbDB;

export const getDatas = async (paging: any, option: any, collectionName: any): Promise<{ data: Array<any>; info: PaginationEntity }> => {

  // const whereQuery = option.filter ? where(option.filter.field, "==", option.filter.value) : where("deviceName", "!=", " ")
  const deviceCollecttion = collection(db, collectionName);

  const q = query(deviceCollecttion,
    orderBy('key'),
    startAfter((paging.current - 1) * paging.pageSize),
    limit(paging.pageSize));

  const docs = getDocs(q);
  const count = getCountFromServer(deviceCollecttion);

  const data = await docs;
  const total = await count;

  const customdata = data.docs.map((mydoc) => ({ ...mydoc.data(), id: mydoc.id }));


  console.group([
    '===========================================================================',
    customdata,
    total.data().count,
    paging,
    option.filter.field,
    option.filter.value,
    '============================================================================',
  ]);
  console.groupEnd();
  return { data: customdata, info: { total: total.data().count } };
};


export const getSingleData = async (collectionName: string, documentId: string): Promise<{ data: any, status: boolean }> => {

  const docRef = doc(db, collectionName, documentId);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { data: docSnap.data(), status: true };
  } else {
    return { data: 'Data dont exist!!!', status: false };
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