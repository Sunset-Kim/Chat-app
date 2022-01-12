import React from 'react';
import styles from './header.module.css';

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className={styles.header}>
      {/* logout */}
      {onLogout && (
        <button
          className={styles.btn__logout + ' btn-secondary'}
          onClick={onLogout}
        >
          Logout
        </button>
      )}
      <img className="w-20 mr-4" src="/images/logo.png" alt="logo" />
      <h1 className={styles.title}>비즈니스 카드 메이커</h1>
    </header>
  );
};

export default Header;
