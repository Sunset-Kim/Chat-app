import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  addDoc,
  onSnapshot,
  query,
  QuerySnapshot,
} from 'firebase/firestore';
import { off } from 'firebase/database';

interface ImageData {
  createAt: string;
  userID: string;
  imgURL: string;
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
}

export default StoreServices;
