import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { CardsDatabase, localCardsAtom } from '../../state/data';
import Card from '../card/card';

const Preview = () => {
  const localCards = useRecoilValue(localCardsAtom);

  return (
    <ul className="flex-1 basis-1/2 bg-emerald-200 p-3">
      {localCards &&
        Object.values(localCards).map(card => (
          <Card key={card.id} card={card}></Card>
        ))}
    </ul>
  );
};

export default Preview;
