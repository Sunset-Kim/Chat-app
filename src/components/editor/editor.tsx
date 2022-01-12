import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { cardsAtom } from '../../state/data';
import CardAddForm from '../card_add_form/card_add_form';

import CardEditForm from '../card_edit_form/card_edit_form';

const Editor = () => {
  const cards = useRecoilValue(cardsAtom);

  return (
    <div className="flex-1 basis-1/2 p-2 bg-emerald-400">
      {cards &&
        Object.values(cards).map(card => (
          <CardEditForm key={card.id} card={card}>
            {card.title}
          </CardEditForm>
        ))}
      <CardAddForm />
    </div>
  );
};

export default Editor;