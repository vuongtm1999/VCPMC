import { PaginationEntity } from '@core/pagination/entity';
import { collection, getDocs, orderBy, query, startAfter, where } from 'firebase/firestore';
import FirebaseConfig from '../FirebaseConfig';

const db = FirebaseConfig.fbDB;

export const getDatas = async (paging: any, option: any, collectionName: any): Promise<{ data: Array<any>; info: PaginationEntity }> => {

  const collecttion = collection(db, collectionName)

  const q = query(collecttion,
    orderBy('id'),
    startAfter((paging.current - 1) * paging.pageSize),
    where('id', '!=', ' '),
  );

  const docs = await getDocs(q);
  // const count = await getCountFromServer(deviceCollecttion);

  const data = await docs;
  // const total = await count;

  let customdata: any = data.docs.map((d) => ({ ...d.data(), id: d.id }));

  console.log(customdata, option);

  if (option.filter.ownership && option.filter.ownership !== 'undefined' && option.filter.ownership !== '0') {
    customdata = customdata.filter((item) => {
      return item.ownership.includes(option.filter.ownership);
    });
  }

  if (option.filter.validity && option.filter.validity !== 'undefined' && option.filter.validity !== '0') {
    customdata = customdata.filter((item) => {
      return item.validity.includes(option.filter.validity)
    });
  }

  if (option.search) {
    customdata = customdata.filter((item) => {
      const resultSearch = item.authorized_person.search(new RegExp(option.search, "i")) >= 0 || item.number.search(new RegExp(option.search, "i")) >= 0 || item.name.search(new RegExp(option.search, "i")) >= 0;
      return resultSearch;
      // return item.authorized_person.toLowerCase().indexOf(option.search.toLowerCase()) >= 0;
    });
  }


  console.log(customdata);

  // console.group([
  //   '===========================================================================',
  //   customdata,
  //   paging,
  //   option.filter.field,
  //   option.filter.value,
  //   '============================================================================',
  // ]);
  // console.groupEnd();


  return { data: customdata, info: { total: customdata.length } };
};

