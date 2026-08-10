import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@context/StoreContext';
import styles from './styles.module.scss';

function FooterLinksGroup() {
  const navigate = useNavigate();
  const { t, setActiveCategory } = useStore();

  const handleNav = (path, category = null) => {
    if (category) setActiveCategory(category);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.linksGrid}>
      <div className={styles.colBrand}>
        <div className={styles.brandTitleRow}>
          <span className={styles.brandTitle}>XStore</span>
          <span className={styles.brandSub}>Marseille04</span>
        </div>
        <p className={styles.brandDesc}>{t.footerAbout}</p>
      </div>

      <div className={styles.colGroup}>
        <h4 className={styles.colHeader}>{t.quickLinks}</h4>
        <ul className={styles.linkList}>
          <li className={styles.linkItem}>
            <button onClick={() => handleNav('/')} className={styles.linkBtn}>
              {t.navHome}
            </button>
          </li>
          <li className={styles.linkItem}>
            <button onClick={() => handleNav('/shop')} className={styles.linkBtn}>
              {t.navShop}
            </button>
          </li>
          <li className={styles.linkItem}>
            <button onClick={() => handleNav('/blog')} className={styles.linkBtn}>
              Blog
            </button>
          </li>
          <li className={styles.linkItem}>
            <button onClick={() => handleNav('/about-us')} className={styles.linkBtn}>
              {t.navAbout}
            </button>
          </li>
          <li className={styles.linkItem}>
            <button onClick={() => handleNav('/contact-us')} className={styles.linkBtn}>
              {t.navContact}
            </button>
          </li>
        </ul>
      </div>

      <div className={styles.colGroup}>
        <h4 className={styles.colHeader}>{t.categories}</h4>
        <ul className={styles.linkList}>
          <li className={styles.linkItem}>
            <button onClick={() => handleNav('/shop', 'furniture')} className={styles.linkBtn}>
              {t.furniture}
            </button>
          </li>
          <li className={styles.linkItem}>
            <button onClick={() => handleNav('/shop', 'fashion')} className={styles.linkBtn}>
              {t.fashion}
            </button>
          </li>
          <li className={styles.linkItem}>
            <button onClick={() => handleNav('/shop', 'decor')} className={styles.linkBtn}>
              {t.decor}
            </button>
          </li>
          <li className={styles.linkItem}>
            <button onClick={() => handleNav('/shop', 'beauty')} className={styles.linkBtn}>
              {t.beauty}
            </button>
          </li>
        </ul>
      </div>

      <div className={`${styles.colGroup} ${styles.colGroupSmall}`}>
        <h4 className={styles.colHeader}>{t.contactUs}</h4>
        <div className={styles.contactList}>
          <p>📍 123 Phố Marseille, Q1, TPHCM</p>
          <p>📞 +84 1900 6868</p>
          <p>✉️ support@xstore-marseille.com</p>
        </div>
      </div>
    </div>
  );
}

export default FooterLinksGroup;
