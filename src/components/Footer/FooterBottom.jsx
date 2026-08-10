import React from 'react';
import { useStore } from '@context/StoreContext';
import styles from './styles.module.scss';

function FooterBottom() {
  const { t } = useStore();

  return (
    <div className={styles.bottomRow}>
      <p>{t.copyright}</p>
      <div className={styles.paymentBadges}>
        <span className={styles.payBadge}>MoMo QR</span>
        <span className={styles.payBadge}>Visa / Master</span>
        <span className={styles.payBadge}>COD</span>
      </div>
    </div>
  );
}

export default FooterBottom;
