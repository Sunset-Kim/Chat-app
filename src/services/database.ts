import { CardsDatabase, ICardInfo } from '../state/data';
import app from './firebase';

export class DatabaseService {
  private database = app.database();

  addCard(userID: string, cards: ICardInfo) {
    this.database.ref(`cards/${userID}/${cards.id}`).set(cards);
  }

  removeCard(userID: string, cardId: string) {
    this.database.ref(`cards/${userID}/${cardId}`).remove();
  }

  syncCards(userID: string, onUpdate: (value: CardsDatabase) => void) {
    const ref = this.database.ref(`cards/${userID}`);
    ref.on('value', snapshot => {
      const value = snapshot.val();
      onUpdate(value);
      return () => ref.off();
    });
  }

  async getCardData(userID: string) {
    return this.database.ref(`cards/${userID}`).once('value');
  }
}
