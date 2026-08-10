import React from 'react';
import TopBar from './TopBar';
import NavMenu from './NavMenu';
import HeaderLogo from './HeaderLogo';
import HeaderActions from './HeaderActions';
import styles from './styles.module.scss';

function Header() {
  return (
    <header className={styles.headerWrapper}>
      <TopBar />
      <div className={styles.mainHeader}>
        <NavMenu />
        <HeaderLogo />
        <HeaderActions />
      </div>
    </header>
  );
}

export default Header;
