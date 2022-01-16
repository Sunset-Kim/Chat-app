import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue, useRecoilState } from 'recoil';
import Channel from '../../components/channel/channel';
import Header from '../../components/header/header';
import Lnb from '../../components/lnb/lnb';
import { DatabaseService } from '../../services/card_repository';
import { authServiceAtom, userAtom, userIdAtom } from '../../state/auth';
import { cardsAtom, CardsDatabase, localCardsAtom } from '../../state/data';

const Home = () => {
  const navigate = useNavigate();
  const authService = useRecoilValue(authServiceAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const userId = useRecoilValue(userIdAtom);
  const database = new DatabaseService();
  const [cards, setCards] = useRecoilState(cardsAtom);

  const onLogout = () => {
    authService.logout().then(result => {
      localStorage.setItem('user', '');
      setUser(null);
    });
  };

  const onUpdate = (value: CardsDatabase) => {
    setCards(value);
  };

  // useEffect

  // 01 . login check
  useEffect(() => {
    authService.onAuthChange(user => !user && navigate('/login'));
  }, [user]);

  // 02. realtime database
  useEffect(() => {
    if (!userId) return;
    const syncFunc = database.syncCards(userId, onUpdate);

    return () => {
      syncFunc();
    };
  }, [userId]);

  return (
    <div className="w-full h-full">
      <Header onLogout={onLogout} />
      <main className="w-full h-full flex pt-14 overflow-hidden">
        <Lnb />
        <Channel />

        {/* <aside className="absolute bottom-0 left-0 w-full h-fit">
          <InputCard />
        </aside> */}
      </main>
    </div>
  );
};

export default Home;
