import React from 'react';
import NewsletterSection from './NewsletterSection';
import FooterLinksGroup from './FooterLinksGroup';
import FooterBottom from './FooterBottom';
import styles from './styles.module.scss';

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.inner}>
        <NewsletterSection />
        <FooterLinksGroup />
        <FooterBottom />
      </div>
    </footer>
  );
}

export default Footer;
