import { PaginationEntity } from '@core/pagination/entity';
import { addDoc, collection, doc, getDoc, setDoc, getDocs, QueryConstraint, where, query, orderBy, startAfter } from 'firebase/firestore';
import FirebaseConfig from '../FirebaseConfig';
import lodash from 'lodash';

const db = FirebaseConfig.fbDB;

export const getDatas = async (paging: any, option: any, collectionName: any): Promise<{ data: Array<any>; info: PaginationEntity }> => {

    const collecttion = collection(db, collectionName)

    var conditionQuery: QueryConstraint[] = [where('id', '!=', ' ')];

    if (!lodash.isEmpty(option.filter)) {
        Object.keys(option.filter).forEach((key) => {
            if (option.filter[key] !== 'all') {
                conditionQuery.push(where(`${key}`, '==', option.filter[key]));
            }
        })
    }

    const q = query(collecttion,
        orderBy('id'),
        startAfter((paging.current - 1) * paging.pageSize),
        ...conditionQuery
    );

    const docs = await getDocs(q);
    const data = await docs;

    let customdata: any = data.docs.map((d) => ({ ...d.data(), id: d.id }));

    // console.log(customdata, option);

    if (option.search) {
        customdata = customdata.filter(data => {
            // .some là Trả về true nếu trong row đó có ít nhất 1 trường(trường đầu tiên) bằng với ketword search
            // ngược lại k có trường nào bằng thì trả về false
            return Object.keys(data).some(key => typeof data[key] === 'string' ? data[key].toLowerCase().includes(option.search.toLowerCase()) : false)
        })
    }

    console.log(customdata, option);

    return { data: customdata, info: { total: customdata.length } };
};

export const getSingleData = async (collectionName: string, documentId: string): Promise<{ data: any, status: boolean }> => {

    const docRef = doc(db, collectionName, documentId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { data: docSnap.data(), status: true };
    } else {
        return { data: "Data don't exist!!!", status: false };
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