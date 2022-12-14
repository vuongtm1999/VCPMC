import { getSingleData, addData, ChangeData, getDatas } from './../../firebase/fbServices/index';
import { PaginationEntity } from '@core/pagination/entity';

const collection = 'authorization-contract';

const getAuthorizationContracts = (paging: any, option: any): Promise<{ data: Array<any>; info: PaginationEntity }> => {
  console.log('paging: ', paging);
  console.log('option: ', option);

  return getDatas(paging, option, collection);
};

const getAuthorizationContract = (documentId: string): Promise<{ data: any; status: boolean }> => {
  return getSingleData(collection, documentId);
};

const addAuthorizationContract  = (data): Promise<{ status: boolean }> => {
  return addData(collection, data);
};

const changeAuthorizationContract  = (documentId: string, data): Promise<{ status: boolean }> => {
  return ChangeData(collection, documentId, data);
};

export default {
  getAuthorizationContracts,
  getAuthorizationContract,
  addAuthorizationContract,
  changeAuthorizationContract,
};