import React from 'react';

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="fixed w-full h-18 flex items-center px-4 bg-rose-300">
      {onLogout && (
        <button
          className="btn-primary btn-md btn-solid absolute right-4"
          onClick={onLogout}
        >
          Logout
        </button>
      )}
      <img className="w-20 mr-4" src="/images/logo.png" alt="logo" />
      <h1 className="text-lg font-bold">비즈니스 카드 메이커</h1>
    </header>
  );
};

export default Header;
