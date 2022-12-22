import { PaginationEntity } from '@core/pagination/entity';
import { addData, ChangeData, getSingleData, getDatas } from 'src/firebase/fbServices';
import Record from './Entity';

const collection = 'record';

const getRecords = (paging: any, option: any): Promise<{ data: Array<any>; info: PaginationEntity }> => {
  console.log('Get datas');
  return getDatas(paging, option, collection);
};

const getRecord = (documentId: string): Promise<{ data: any; status: boolean }> => {
  return getSingleData(collection, documentId);
};

const addRecord  = (data): Promise<{ status: boolean }> => {
  return addData(collection, data);
};

const changeRecord  = (documentId: string, data: Partial<any>): Promise<{ status: boolean }> => {
  return ChangeData(collection, documentId, data);
};

export default {
  getRecords,
  getRecord,
  addRecord,
  changeRecord,
};