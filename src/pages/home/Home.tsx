import React, { useEffect, useState } from 'react';
import { QuerySnapshot } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router';
import { useRecoilValue, useRecoilState } from 'recoil';
import Header from '../../components/header/header';
import Lnb from '../../components/lnb/lnb';
import PopupLogin from '../../components/popup_login/popup_login';
import StoreServices from '../../services/fire_store';
import { authServiceAtom, userAtom, userIdAtom } from '../../state/auth';
import { chatAtom } from '../../state/data';
import PopupProfile from '../../components/popup_profile/popup_profile';
import Loading from '../../components/loading/loading';
import { isUploadingAtom } from '../../state/uploader';

const Home = () => {
  // services
  const store = new StoreServices();
  const authService = useRecoilValue(authServiceAtom);

  // recoil
  const isUploading = useRecoilValue(isUploadingAtom);
  const userId = useRecoilValue(userIdAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [chat, setChat] = useRecoilState<any>(chatAtom);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // custom func
  const onLogout = () => {
    authService.logout().then(result => {
      localStorage.setItem('user', '');
      setUser(null);
    });
  };

  const onLogin = () => setIsLoginOpen(true);
  const onProfile = () => setIsProfileOpen(true);
  const onUpdate = (value: QuerySnapshot) => {
    const chatList = value.docs.map(item => item.data());
    setChat(chatList);
  };

  // useEffect

  // 01. realtime database
  useEffect(() => {
    const syncFunc = store.readSyncChat(onUpdate);
    if (!userId) return;
    return () => {
      syncFunc();
    };
  }, [userId]);

  // 02. loginPopup 지우기
  useEffect(() => {
    if (!userId) return;
    setIsLoginOpen(false);
  }, [userId]);

  useEffect(() => {
    authService.onAuthChange(user => {
      console.log('유저체인지');
      setUser(user);
    });
  }, []);

  return (
    <>
      {isUploading && <Loading />}
      <div className="w-full h-full">
        <Header onLogin={onLogin} onLogout={onLogout} onProfile={onProfile} />
        <main className="w-full h-full flex pt-[60px] overflow-hidden">
          <Lnb />
          <div className="w-full overflow-x-hidden overflow-y-auto bg-neutral-100 p-4 text-neutral-800">
            <Outlet />
          </div>
        </main>

        <AnimatePresence exitBeforeEnter>
          {isLoginOpen && <PopupLogin onClose={() => setIsLoginOpen(false)} />}
          {isProfileOpen && (
            <PopupProfile onClose={() => setIsProfileOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Home;
