import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  addDoc,
  onSnapshot,
  query,
  QuerySnapshot,
  getDocs,
} from 'firebase/firestore';

export interface ImageData {
  createAt: string;
  userID: string;
  imgURL: string;
}

export interface IChat {
  userID: string;
  createAt: number;
  message: string;
  imgURL?: string;
}

class StoreServices {
  uploadImages(data: ImageData) {
    const ref = collection(db, 'images', 'jjal', data.userID);
    return addDoc(ref, data);
  }

  readSyncImages(userID: string, onUpdate: (value: QuerySnapshot) => void) {
    const q = query(collection(db, 'images', 'jjal', userID));
    return onSnapshot(q, onUpdate);
  }

  async getImageData(userID: string) {
    const docRef = collection(db, 'images', 'jjal', userID);
    const result = await getDocs(docRef);
    return result;
  }

  uploadChat(data: IChat) {
    const ref = doc(db, 'chat', data.createAt.toString());
    return setDoc(ref, data);
  }

  readSyncChat(userID: string, onUpdate: (value: QuerySnapshot) => void) {
    const q = collection(db, 'chat');
    return onSnapshot(q, onUpdate);
  }
}

export default StoreServices;
