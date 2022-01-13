import { atom, selector } from 'recoil';
import { DatabaseService } from '../services/database';
import { userAtom } from './auth';

const databaseService = new DatabaseService();

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

export type CardsDatabase = null | { [key: string]: ICardInfo };

export const localCardsAtom = atom<CardsDatabase>({
  key: 'localCards',
  default: {},
});

export const cardsAtom = selector<CardsDatabase>({
  key: 'cards',
  get: async ({ get }) => {
    const userID = get(userAtom)?.uid;
    if (!userID) return {};
    const result = await databaseService.getCardData(userID);
    return result.val();
  },

  set: ({ set }, newValue) => {
    console.log(newValue);
    set(localCardsAtom, newValue);
  },
});
