import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion, Variants } from 'framer-motion';
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

  const iconVariants: Variants = {
    hidden: {
      pathLength: 0,
      fill: 'rgba(255, 255, 255, 0)',
    },

    visible: {
      pathLength: 1,
      fill: 'rgba(255, 255, 255, 1)',

      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'mirror',
      },
    },
  };
  return (
    <header className="fixed w-full h-[60px] flex items-center px-4 bg-amber-300 z-10">
      <div className="flex items-center">
        <div className="w-12 h-12 mr-3">
          <svg viewBox="0 0 512 512">
            <motion.path
              variants={iconVariants}
              stroke="rgba(255,255,255,1)"
              strokeWidth={10}
              initial="hidden"
              animate="visible"
              d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7 1.3 3 4.1 4.8 7.3 4.8 66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128.2 304H116c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h12.3c6 0 10.4-3.5 10.4-6.6 0-1.3-.8-2.7-2.1-3.8l-21.9-18.8c-8.5-7.2-13.3-17.5-13.3-28.1 0-21.3 19-38.6 42.4-38.6H156c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8h-12.3c-6 0-10.4 3.5-10.4 6.6 0 1.3.8 2.7 2.1 3.8l21.9 18.8c8.5 7.2 13.3 17.5 13.3 28.1.1 21.3-19 38.6-42.4 38.6zm191.8-8c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8v-68.2l-24.8 55.8c-2.9 5.9-11.4 5.9-14.3 0L224 227.8V296c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8V192c0-8.8 7.2-16 16-16h16c6.1 0 11.6 3.4 14.3 8.8l17.7 35.4 17.7-35.4c2.7-5.4 8.3-8.8 14.3-8.8h16c8.8 0 16 7.2 16 16v104zm48.3 8H356c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h12.3c6 0 10.4-3.5 10.4-6.6 0-1.3-.8-2.7-2.1-3.8l-21.9-18.8c-8.5-7.2-13.3-17.5-13.3-28.1 0-21.3 19-38.6 42.4-38.6H396c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8h-12.3c-6 0-10.4 3.5-10.4 6.6 0 1.3.8 2.7 2.1 3.8l21.9 18.8c8.5 7.2 13.3 17.5 13.3 28.1.1 21.3-18.9 38.6-42.3 38.6z"
            />
          </svg>
        </div>
        <h1 className="text-lg font-bold">모두의 채팅</h1>
      </div>

      {/* 오른쪽 상단 메뉴 */}

      {userID ? (
        <motion.div className="absolute right-4 flex items-center justify-center">
          {/* 사용자 메뉴 토글 */}
          <button
            onClick={onToggleMenu}
            className={`rounded-ful w-10 h-10 rounded-full ${
              !isOpen ? `bg-amber-500` : `bg-amber-900`
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
            className="w-10 h-10 rounded-full bg-amber-900"
            onClick={onLogin}
          >
            <FontAwesomeIcon icon={faSignInAlt} />
          </button>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
