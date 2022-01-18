import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userIdAtom } from '../../state/auth';

interface HeaderProps {
  onLogout: () => void;
  onLogin: () => void;
  onProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onLogin, onProfile }) => {
  const userID = useRecoilValue(userIdAtom);
  const [isOpen, setIsOpen] = useState(false);
  const onToggleMenu = () => setIsOpen(prev => !prev);
  return (
    <header className="fixed w-full h-18 flex items-center px-4 bg-rose-300 z-10">
      {/* 오른쪽 상단 메뉴 */}

      {userID ? (
        <motion.div className="absolute right-4 flex items-center justify-center">
          {/* 사용자 메뉴 토글 */}
          <button
            onClick={onToggleMenu}
            className={`rounded-ful w-10 h-10 rounded-full ${
              !isOpen ? `bg-rose-500` : `bg-rose-900`
            }`}
          >
            <FontAwesomeIcon icon={faUserCog} />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-14 right-0 w-fit h-fit"
              >
                <button
                  className="btn-primary rounded-full w-10 h-10 mb-2"
                  onClick={onProfile}
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>
                <button
                  className="btn-primary w-10 h-10 btn-solid rounded-full "
                  onClick={onLogout}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div className="absolute right-4">
          <button
            className="w-10 h-10 rounded-full bg-rose-900"
            onClick={onLogin}
          >
            <FontAwesomeIcon icon={faSignInAlt} />
          </button>
        </motion.div>
      )}
      <img className="w-20 mr-4" src="/images/logo.png" alt="logo" />
      <h1 className="text-lg font-bold">채팅앱</h1>
    </header>
  );
};

export default Header;
