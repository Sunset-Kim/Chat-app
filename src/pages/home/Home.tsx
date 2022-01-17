import { QuerySnapshot } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useRecoilValue, useRecoilState, Snapshot } from 'recoil';
import Header from '../../components/header/header';
import Lnb from '../../components/lnb/lnb';
import StoreServices from '../../services/fire_store';
import { authServiceAtom, userAtom, userIdAtom } from '../../state/auth';
import { chatAtom } from '../../state/data';

const Home = () => {
  // services
  const store = new StoreServices();
  const authService = useRecoilValue(authServiceAtom);

  // recoil
  const userId = useRecoilValue(userIdAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [chat, setChat] = useRecoilState<any>(chatAtom);

  // hook
  const navigate = useNavigate();

  const onLogout = () => {
    authService.logout().then(result => {
      localStorage.setItem('user', '');
      setUser(null);
    });
  };

  const onUpdate = (value: QuerySnapshot) => {
    const chatList = value.docs.map(item => item.data());
    setChat(chatList);
  };

  // useEffect

  // 01 . login check
  useEffect(() => {
    authService.onAuthChange(user => !user && navigate('/login'));
  }, [user]);

  // 02. realtime database
  useEffect(() => {
    if (!userId) return;
    const syncFunc = store.readSyncChat(userId, onUpdate);

    return () => {
      syncFunc();
    };
  }, [userId]);

  return (
    <div className="w-full h-full">
      <Header onLogout={onLogout} />
      <main className="w-full h-full flex pt-14 overflow-hidden">
        <Lnb />
        <div className="w-full overflow-x-hidden overflow-y-auto bg-neutral-100 p-2 text-neutral-800">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Home;
