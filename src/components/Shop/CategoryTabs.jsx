import React from 'react';
import { useStore } from '@context/StoreContext';
import styles from './styles.module.scss';

function CategoryTabs({ categories, count }) {
  const { t, activeCategory, setActiveCategory } = useStore();

  return (
    <div className={styles.categoryTabs}>
      <div className={styles.tabsList}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`${styles.tabBtn} ${isActive ? styles.tabActive : ''}`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className={styles.productCount}>
        {count} {t.featuredProducts.toLowerCase()}
      </div>
    </div>
  );
}

export default CategoryTabs;
