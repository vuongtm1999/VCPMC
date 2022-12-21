import { PaginationEntity } from '@core/pagination/entity';
import { addData, ChangeData, getSingleData, getDatas } from 'src/firebase/fbServices';
import AuthorizedWork from './Entity';

const collection = 'authorized_works';

const getAuthorizedWorks = (paging: any, option: any): Promise<{ data: Array<AuthorizedWork>; info: PaginationEntity }> => {
  return getDatas(paging, option, collection);
};

const getAuthorizedWork = (documentId: string): Promise<{ data: AuthorizedWork; status: boolean }> => {
  return getSingleData(collection, documentId);
};

const addAuthorizedWork  = (data): Promise<{ status: boolean }> => {
  return addData(collection, data);
};

const changeAuthorizedWork  = (documentId: string, data: Partial<AuthorizedWork>): Promise<{ status: boolean }> => {
  return ChangeData(collection, documentId, data);
};

export default {
  getAuthorizedWorks,
  getAuthorizedWork,
  addAuthorizedWork,
  changeAuthorizedWork,
};