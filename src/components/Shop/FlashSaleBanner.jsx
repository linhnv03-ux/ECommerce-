import React, { useState, useEffect } from 'react';
import { useStore } from '@context/StoreContext';
import ProductCard from './ProductCard';
import { Flame, Clock } from 'lucide-react';
import styles from './styles.module.scss';

function FlashSaleBanner() {
  const { t, products } = useStore();
  const flashProducts = products.filter((p) => p.isFlashSale);

  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (flashProducts.length === 0) return null;

  return (
    <section className={styles.flashBannerSection}>
      <div className={styles.flashBannerContainer}>
        <div className={styles.flashBannerHeader}>
          <div className={styles.flashBannerLeft}>
            <div className={styles.flashIconBox}>
              <Flame className={styles.flameIcon} />
            </div>
            <div>
              <h2 className={styles.flashTitle}>
                {t.flashSale}
              </h2>
              <p className={styles.flashSubtitle}>
                Marseille Limited Time Deals - Discount Up to 40%
              </p>
            </div>
          </div>

          <div className={styles.flashTimerBox}>
            <Clock className={styles.clockIcon} />
            <span style={{ color: '#d6d3d1', marginRight: 4 }}>{t.flashSaleEnds}</span>
            <span className={styles.flashTimerDigit}>
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className={styles.flashTimerDigit}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className={styles.flashTimerDigit}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className={styles.flashGrid}>
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FlashSaleBanner;
