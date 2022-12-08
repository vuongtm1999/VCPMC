import { PaginationEntity } from '@core/pagination/entity';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import FirebaseConfig from '../FirebaseConfig';

const db = FirebaseConfig.fbDB;

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