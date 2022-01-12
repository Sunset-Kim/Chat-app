import React from 'react';
import { useRecoilValue } from 'recoil';
import { cardsAtom } from '../../state/data';
import Card from '../card/card';

const Preview = () => {
  const cards = useRecoilValue(cardsAtom);

  return (
    <ul className="flex-1 basis-1/2 bg-emerald-200 p-3">
      {cards &&
        Object.values(cards).map(card => (
          <Card key={card.id} card={card}></Card>
        ))}
    </ul>
  );
};

export default Preview;
