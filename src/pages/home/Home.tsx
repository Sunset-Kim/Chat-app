import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import Editor from '../../components/editor/editor';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Preview from '../../components/preview/preview';
import { authServiceAtom, userAtom } from '../../state/auth';

const Home = () => {
  const navigate = useNavigate();
  const authService = useRecoilValue(authServiceAtom);
  const user = useRecoilValue(userAtom);

  console.log(user);

  const onLogout = () => {
    authService.logout().then(result => localStorage.setItem('user', ''));
  };

  useEffect(() => {
    authService.onAuthChange(user => !user && navigate('/login'));
  }, []);

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
