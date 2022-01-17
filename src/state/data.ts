import { atom } from 'recoil';
import { IChat } from '../services/fire_store';

export const chatAtom = atom<IChat[]>({
  key: 'caht',
  default: [],
});
