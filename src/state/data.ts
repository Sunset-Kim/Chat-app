import { atom } from 'recoil';

export interface ICardInfo {
  id: number;
  name: string;
  company: string;
  theme: string;
  title: string;
  email: string;
  message: string;
  fileName: string;
  fileURL?: string;
}

export const cardsAtom = atom<{ [key: string]: ICardInfo } | null>({
  key: 'cards',
  default: {
    1: {
      id: 1,
      name: 'elei',
      company: 'samsung',
      theme: 'light',
      title: '안녕',
      email: 'wwfw@sdf',
      message: 'go for it',
      fileName: 'go sld',
    },
    2: {
      id: 2,
      name: 'elei',
      company: 'samsung',
      theme: 'light',
      title: '안녕',
      email: 'wwfw@sdf',
      message: 'go for it',
      fileName: 'go sld',
    },
    3: {
      id: 3,
      name: 'elei',
      company: 'samsung',
      theme: 'light',
      title: '안녕',
      email: 'wwfw@sdf',
      message: 'go for it',
      fileName: 'go sld',
    },
  },
});
