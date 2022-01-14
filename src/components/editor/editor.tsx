import React from 'react';
import { useRecoilValue } from 'recoil';
import CardAddForm from '../card_add_form/card_add_form';
import CardEditForm from '../card_edit_form/card_edit_form';
import { localCardsAtom } from '../../state/data';

const Editor = () => {
  const cards = useRecoilValue(localCardsAtom);

  return (
    <div className="flex-1 basis-1/2 p-2 bg-emerald-400">
      {cards &&
        Object.values(cards).map(card => (
          <CardEditForm key={card.id} card={card} />
        ))}
      <CardAddForm />
    </div>
  );
};

export default Editor;
