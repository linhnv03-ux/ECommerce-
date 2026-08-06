import React, { useState } from 'react';
import { useStore } from '@context/StoreContext';
import { Send, CheckCircle2 } from 'lucide-react';
import styles from './styles.module.scss';

function Footer() {
  const { t, setActiveView, setActiveCategory, addToast } = useStore();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    addToast('Đăng ký thành công!', 'Mã giảm giá XSTORE10 đã được gửi đến email của bạn.', 'success');
    setEmailInput('');
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.inner}>
        {/* Newsletter Section */}
        <div className={styles.newsletter}>
          <div>
            <h3 className={styles.title}>{t.newsletterTitle}</h3>
            <p className={styles.desc}>{t.newsletterDesc}</p>
          </div>

          {subscribed ? (
            <div className={styles.successMsg}>
              <CheckCircle2 style={{ width: 20, height: 20 }} />
              <span>Đã nhận mã XSTORE10 thành công!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className={styles.subForm}>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Nhập địa chỉ Email của bạn..."
                className={styles.emailInput}
              />
              <button
                type="submit"
                className={styles.subBtn}
              >
                <span>{t.subscribe}</span>
                <Send style={{ width: 14, height: 14 }} />
              </button>
            </form>
          )}
        </div>

        {/* Main Footer Links */}
        <div className={styles.linksGrid}>
          <div className={styles.colBrand}>
            <div className={styles.brandTitleRow}>
              <span className={styles.brandTitle}>
                XStore
              </span>
              <span className={styles.brandSub}>
                Marseille04
              </span>
            </div>
            <p className={styles.brandDesc}>
              {t.footerAbout}
            </p>
          </div>

          <div className={styles.colGroup}>
            <h4 className={styles.colHeader}>
              {t.quickLinks}
            </h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <button onClick={() => { setActiveView('home'); window.scrollTo(0,0); }} className={styles.linkBtn}>
                  {t.navHome}
                </button>
              </li>
              <li className={styles.linkItem}>
                <button onClick={() => { setActiveView('shop'); window.scrollTo(0,0); }} className={styles.linkBtn}>
                  {t.navShop}
                </button>
              </li>
              <li className={styles.linkItem}>
                <button onClick={() => { setActiveView('about'); window.scrollTo(0,0); }} className={styles.linkBtn}>
                  {t.navAbout}
                </button>
              </li>
              <li className={styles.linkItem}>
                <button onClick={() => { setActiveView('contact'); window.scrollTo(0,0); }} className={styles.linkBtn}>
                  {t.navContact}
                </button>
              </li>
            </ul>
          </div>

          <div className={styles.colGroup}>
            <h4 className={styles.colHeader}>
              {t.categories}
            </h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <button onClick={() => { setActiveCategory('furniture'); setActiveView('shop'); window.scrollTo(0,0); }} className={styles.linkBtn}>
                  {t.furniture}
                </button>
              </li>
              <li className={styles.linkItem}>
                <button onClick={() => { setActiveCategory('fashion'); setActiveView('shop'); window.scrollTo(0,0); }} className={styles.linkBtn}>
                  {t.fashion}
                </button>
              </li>
              <li className={styles.linkItem}>
                <button onClick={() => { setActiveCategory('decor'); setActiveView('shop'); window.scrollTo(0,0); }} className={styles.linkBtn}>
                  {t.decor}
                </button>
              </li>
              <li className={styles.linkItem}>
                <button onClick={() => { setActiveCategory('beauty'); setActiveView('shop'); window.scrollTo(0,0); }} className={styles.linkBtn}>
                  {t.beauty}
                </button>
              </li>
            </ul>
          </div>

          <div className={`${styles.colGroup} ${styles.colGroupSmall}`}>
            <h4 className={styles.colHeader}>
              {t.contactUs}
            </h4>
            <div className={styles.contactList}>
              <p>📍 123 Phố Marseille, Q1, TPHCM</p>
              <p>📞 +84 1900 6868</p>
              <p>✉️ support@xstore-marseille.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className={styles.bottomRow}>
          <p>{t.copyright}</p>
          <div className={styles.paymentBadges}>
            <span className={styles.payBadge}>MoMo QR</span>
            <span className={styles.payBadge}>Visa / Master</span>
            <span className={styles.payBadge}>COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
