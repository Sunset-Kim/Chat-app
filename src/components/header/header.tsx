import React from 'react';
import styles from './header.module.css';

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="container relative mx-auto px-4 flex bg-slate-200">
      {/* logout */}
      {onLogout && (
        <button onClick={onLogout} className="absolute top-4 right-5">
          Logout
        </button>
      )}
      <img className="w-200 mr-4" src="/images/logo.png" alt="logo" />
      <h1 className="flex-grow flex items-center ">비즈니스 카드 메이커</h1>
    </header>
  );
};

export default Header;
