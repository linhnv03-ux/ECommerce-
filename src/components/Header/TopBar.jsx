import React from 'react';
import { useStore } from '@context/StoreContext';
import { Phone, Mail, Globe } from 'lucide-react';
import styles from './styles.module.scss';

function TopBar() {
  const {
    t,
    language,
    setLanguage,
    currency,
    setCurrency
  } = useStore();

  return (
    <div className={styles.topBar}>
      <div className={styles.topInner}>
        <div className={styles.contactGroup}>
          <span className={styles.contactItem}>
            <Phone className={styles.phoneIcon} />
            +84 1900 6868
          </span>
          <span className={`${styles.contactItem} ${styles.hideMobile}`}>
            <Mail className={styles.mailIcon} />
            support@xstore-marseille.com
          </span>
        </div>

        <div className={styles.announcement}>{t.announcement}</div>

        <div className={styles.rightOptions}>
          <button
            onClick={() => setLanguage(language === 'VI' ? 'EN' : 'VI')}
            className={styles.optionBtn}
          >
            <Globe style={{ width: 12, height: 12 }} />
            {language}
          </button>
          <button
            onClick={() => setCurrency(currency === 'VND' ? 'USD' : 'VND')}
            className={styles.optionBtn}
          >
            {currency === 'VND' ? '₫ VND' : '$ USD'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
