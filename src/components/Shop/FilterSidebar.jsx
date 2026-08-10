import React from 'react';
import { useStore } from '@context/StoreContext';
import styles from './styles.module.scss';

function FilterSidebar({
  priceMaxVND,
  setPriceMaxVND,
  minRating,
  setMinRating,
  onlyInStock,
  setOnlyInStock
}) {
  const { t } = useStore();

  return (
    <aside className={styles.sidebarFilter}>
      <h3 className={styles.filterTitle}>Bộ Lọc Chi Tiết</h3>

      <div className={styles.filterBlock}>
        <label className={styles.filterLabel}>
          Giá tối đa: {priceMaxVND.toLocaleString()}₫
        </label>
        <input
          type="range"
          min={500000}
          max={6000000}
          step={200000}
          value={priceMaxVND}
          onChange={(e) => setPriceMaxVND(Number(e.target.value))}
          className={styles.rangeInput}
        />
        <div className={styles.rangeValues}>
          <span>500.000₫</span>
          <span>6.000.000₫</span>
        </div>
      </div>

      <div className={styles.filterBlock}>
        <label className={styles.filterLabel}>Đánh giá tối thiểu</label>
        <div className={styles.ratingGroup}>
          {[4.5, 4.0, 3.5, 0].map((rate) => (
            <button
              key={rate}
              onClick={() => setMinRating(rate)}
              className={`${styles.ratingBtn} ${minRating === rate ? styles.ratingActive : ''}`}
            >
              {rate === 0 ? 'Tất cả' : `${rate}★`}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stockRow}>
        <span className={styles.stockLabel}>{t.inStockOnly}</span>
        <input
          type="checkbox"
          checked={onlyInStock}
          onChange={(e) => setOnlyInStock(e.target.checked)}
          className={styles.checkbox}
        />
      </div>
    </aside>
  );
}

export default FilterSidebar;
