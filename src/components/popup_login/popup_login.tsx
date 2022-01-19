import React, { ReactEventHandler, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authServiceAtom, userAtom } from '../../state/auth';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import styles from './popup_login.module.css';
import Login from '../login/login';
import Join from '../join/join';
import { storeAtom } from '../../state/data';

interface PopupProps {
  onClose: () => void;
}

const tabcontent = [
  { label: '기존사용자', render: () => <Login /> },
  { label: '신규사용자', render: () => <Join /> },
];

const PopupLogin: React.FC<PopupProps> = ({ onClose }) => {
  // service
  const authService = useRecoilValue(authServiceAtom);
  const storeService = useRecoilValue(storeAtom);
  // recoil
  const setUser = useSetRecoilState(userAtom);

  const [selectedTab, setSelectedTab] = useState(0);

  const onLogin: ReactEventHandler<HTMLButtonElement> = e => {
    const loginType = e.currentTarget.dataset.login as 'google' | 'github';
    authService
      .loginSocial(loginType)
      ?.then(({ user }) => {
        setUser(user);
        storeService.setProfile(
          user.uid,
          user.displayName ?? 'default',
          user.photoURL ?? '',
        );
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(error => console.log('로그인 에러', error));
  };

  const popupVariants: Variants = {
    init: {
      opacity: 0,
      visibility: 'hidden',
    },
    start: {
      opacity: 1,
      visibility: 'visible',
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <motion.section
      variants={popupVariants}
      initial="init"
      animate="start"
      exit="eixt"
    >
      <div
        className="fixed bg-neutral-900/75 top-0 right-0 left-0 bottom-0 z-40"
        onClick={onClose}
      />

      <section className="fixed text-neutral-800 m-auto right-0 left-0 top-0 bottom-0 max-w-md max-h-128 w-full h-max z-50 rounded-lg pb-2">
        {/* tab */}
        <ul className="flex">
          {tabcontent.map((tab, i) => (
            <li
              key={'tab' + tab.label}
              onClick={() => setSelectedTab(i)}
              className={`${styles.tab} ${
                i === selectedTab ? styles.selected : ''
              } `}
            >
              {tab.label}
              {i === selectedTab ? (
                <motion.div className={styles.underline} layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
        <div className="bg-neutral-200 rounded-b-lg">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={selectedTab ? tabcontent[selectedTab].label : 'empty'}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15 }}
            >
              {tabcontent[selectedTab].render()}
            </motion.div>
          </AnimatePresence>
          <div className="px-2 pb-2">
            <ul>
              <li className="mb-2">
                <button
                  type="button"
                  className="block w-full btn-md btn-ghost rounded-full"
                  onClick={onLogin}
                  data-login="google"
                >
                  Google Login
                </button>
              </li>
              {/* <li>
                <button
                  type="button"
                  className="block w-full btn-md btn-ghost rounded-full"
                  onClick={onLogin}
                  data-login="github"
                >
                  Github Login
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </section>
    </motion.section>
  );
};

export default PopupLogin;
