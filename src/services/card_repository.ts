import { CardsDatabase, ICardInfo } from '../state/data';
import { database } from './firebase';
import { ref, set, remove, onValue, get, child } from 'firebase/database';

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
  }

  getCardData(userID: string, onUpdate: (value: CardsDatabase | null) => void) {
    get(child(ref(database), `cards/${userID}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          onUpdate(snapshot.val());
        } else {
          onUpdate(null);
        }
      })
      .catch(error => console.log(error));
  }
}
