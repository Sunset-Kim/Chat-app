import React from 'react';
import { useRecoilValue } from 'recoil';
import { localCardsAtom } from '../../state/data';
import Card from '../card/card';

const Preview = () => {
  const cards = useRecoilValue(localCardsAtom);

  return (
    <ul className="w-full h-full relative">
      {cards &&
        Object.values(cards).map(card => (
          <Card key={card.id} card={card}></Card>
        ))}
    </ul>
  );
};

export default Preview;
