import React, { useState } from 'react';
import { useStore } from '@context/StoreContext';
import { Send, CheckCircle2 } from 'lucide-react';
import styles from './styles.module.scss';

function NewsletterSection() {
  const { t, addToast } = useStore();
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
          <button type="submit" className={styles.subBtn}>
            <span>{t.subscribe}</span>
            <Send style={{ width: 14, height: 14 }} />
          </button>
        </form>
      )}
    </div>
  );
}

export default NewsletterSection;
