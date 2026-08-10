import React from 'react';
import { useStore } from '@context/StoreContext';
import { SlidersHorizontal, Grid, List, FilterX } from 'lucide-react';
import styles from './styles.module.scss';

function ShopToolbar({
  showFilterSidebar,
  setShowFilterSidebar,
  hasActiveFilters,
  resetFilters,
  sortBy,
  setSortBy,
  layoutMode,
  setLayoutMode
}) {
  const { t } = useStore();

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolLeft}>
        <button
          onClick={() => setShowFilterSidebar(!showFilterSidebar)}
          className={`${styles.filterToggleBtn} ${showFilterSidebar ? styles.filterToggleActive : ''}`}
        >
          <SlidersHorizontal style={{ width: 16, height: 16 }} />
          <span>{t.filterByPrice}</span>
        </button>

        {hasActiveFilters && (
          <button onClick={resetFilters} className={styles.resetBtn}>
            <FilterX style={{ width: 14, height: 14 }} />
            <span>Xóa bộ lọc</span>
          </button>
        )}
      </div>

      <div className={styles.toolRight}>
        <div className={styles.sortBox}>
          <span className={styles.sortLabel}>{t.sortBy}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="bestseller">{t.sortBestseller}</option>
            <option value="newest">{t.sortNewest}</option>
            <option value="price-asc">{t.sortPriceAsc}</option>
            <option value="price-desc">{t.sortPriceDesc}</option>
            <option value="rating">{t.sortRating}</option>
          </select>
        </div>

        <div className={styles.layoutGroup}>
          <button
            onClick={() => setLayoutMode('grid')}
            className={`${styles.layoutBtn} ${layoutMode === 'grid' ? styles.layoutActive : ''}`}
          >
            <Grid style={{ width: 16, height: 16 }} />
          </button>
          <button
            onClick={() => setLayoutMode('list')}
            className={`${styles.layoutBtn} ${layoutMode === 'list' ? styles.layoutActive : ''}`}
          >
            <List style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopToolbar;
