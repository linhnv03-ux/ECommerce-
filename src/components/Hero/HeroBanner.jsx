import React from 'react';
import { useStore } from '@context/StoreContext';
import { ArrowRight, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';
import styles from './styles.module.scss';

function HeroBanner() {
  const { t, setActiveView, setActiveCategory } = useStore();

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <img
          src="/assets/images/Banner-Ecommerse.jpeg"
          alt="XStore Marseille04 Banner"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80';
          }}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.heroContent}>
        <div className={styles.contentContainer}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.badge}
          >
            <Sparkles className={styles.sparkleIcon} />
            XStore Marseille04 Collection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={styles.title}
          >
            {t.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.subtitle}
          >
            {t.heroSubtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={styles.description}
          >
            {t.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.ctaGroup}
          >
            <button
              onClick={() => {
                setActiveView('shop');
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={styles.btnPrimary}
            >
              {t.shopNow}
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>

            <button
              onClick={() => {
                setActiveView('shop');
                setActiveCategory('furniture');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={styles.btnSecondary}
            >
              {t.viewCatalog}
            </button>
          </motion.div>

          <div className={styles.guaranteeBar}>
            <div className={styles.guaranteeItem}>
              <ShieldCheck className={styles.guaranteeIcon} />
              <span>Chính hãng 100% Import</span>
            </div>
            <div className={styles.guaranteeItem}>
              <Award className={styles.guaranteeIcon} />
              <span>Bảo hành 24 tháng</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
