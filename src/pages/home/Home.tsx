import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue, useRecoilState } from 'recoil';
import Editor from '../../components/editor/editor';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Preview from '../../components/preview/preview';
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
    <div>
      <Header onLogout={onLogout} />
      <section className="container flex m-auto px-4 flex-col sm:flex-row">
        <Editor />
        <Preview />
      </section>
      <Footer />
      <span>{user?.uid}</span>
    </div>
  );
};

export default Home;
