import { atom, selector } from 'recoil';
import { DatabaseService } from '../services/card_repository';
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
  get: ({ get }) => {
    const userID = get(userAtom)?.uid;
    if (!userID) return {};
    let results: any;
    databaseService.getCardData(userID, () => results);
    return results;
  },

  set: ({ set }, newValue) => {
    console.log(newValue);
    set(localCardsAtom, newValue);
  },
});
