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
  updateDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import { IProfile } from '../state/auth';

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
  userProfile: IProfile;
}

class StoreServices {
  uploadImages(data: ImageData) {
    const ref = doc(db, 'images', 'jjal', data.userID, data.createAt);
    return setDoc(ref, data);
  }

  deleteImages(userID: string, createAt: string) {
    const ref = doc(db, 'images', 'jjal', userID, createAt);
    return deleteDoc(ref);
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

  deleteChat(data: IChat) {
    const ref = doc(db, 'chat', data.createAt.toString());
    return deleteDoc(ref);
  }

  readSyncChat(onUpdate: (value: QuerySnapshot) => void) {
    const q = collection(db, 'chat');
    return onSnapshot(q, onUpdate);
  }

  setProfile(userID: string, name: string, img?: string) {
    const ref = doc(db, 'user', userID);
    const profile = { name, img: img ?? '' };
    return setDoc(ref, profile);
  }

  getProfile(userID: string) {
    const ref = doc(db, 'user', userID);
    return getDoc(ref);
  }
}

export default StoreServices;
