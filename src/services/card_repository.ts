import { CardsDatabase, ICardInfo } from '../state/data';
import { database } from './firebase';
import { ref, set, remove, onValue, get, child, off } from 'firebase/database';

export class DatabaseService {
  addCard(userID: string, cards: ICardInfo) {
    const cardRef = ref(database, `cards/${userID}/${cards.id}`);
    set(cardRef, cards);
  }

  removeCard(userID: string, cardId: string) {
    const cardRef = ref(database, `cards/${userID}/${cardId}`);
    remove(cardRef);
  }

  syncCards(userID: string, onUpdate: (value: CardsDatabase) => void) {
    const cardRef = ref(database, `cards/${userID}`);
    onValue(cardRef, snapshot => {
      const value = snapshot.val();
      onUpdate(value);
    });

    return () => off(cardRef);
  }

  async getCardData(userID: string) {
    const result = await get(child(ref(database), `cards/${userID}`));
    return result.val();
  }
}
