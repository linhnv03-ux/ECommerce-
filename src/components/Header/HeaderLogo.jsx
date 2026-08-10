import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

function HeaderLogo() {
  const navigate = useNavigate();

  return (
    <div
      className={styles.logo}
      onClick={() => {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <span className={styles.logoText}>XStore</span>
      <span className={styles.logoSub}>Marseille04</span>
    </div>
  );
}

export default HeaderLogo;
