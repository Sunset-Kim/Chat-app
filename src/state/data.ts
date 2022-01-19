import { atom } from 'recoil';
import StoreServices, { IChat } from '../services/fire_store';

export const storeAtom = atom({
  key: 'store',
  default: new StoreServices(),
});

export const chatAtom = atom<IChat[]>({
  key: 'caht',
  default: [],
});

export const errorAtom = atom({
  key: 'error',
  default: false,
});
