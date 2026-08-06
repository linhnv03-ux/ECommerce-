import React, { useState, useMemo } from 'react';
import { useStore } from '@context/StoreContext';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Grid, List, FilterX } from 'lucide-react';
import styles from './styles.module.scss';

function ProductGrid() {
  const {
    t,
    products,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [sortBy, setSortBy] = useState('bestseller');
  const [layoutMode, setLayoutMode] = useState('grid');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);

  const [priceMaxVND, setPriceMaxVND] = useState(6000000);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);

  const categories = [
    { key: 'all', label: t.allCategories },
    { key: 'furniture', label: t.furniture },
    { key: 'fashion', label: t.fashion },
    { key: 'decor', label: t.decor },
    { key: 'beauty', label: t.beauty },
    { key: 'accessories', label: t.accessories }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const titleMatch = product.title.toLowerCase().includes(query) || (product.titleEn && product.titleEn.toLowerCase().includes(query));
        const descMatch = product.description.toLowerCase().includes(query);
        const catMatch = product.categoryLabel.toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !catMatch) return false;
      }
      if (product.priceVND > priceMaxVND) return false;
      if (minRating > 0 && product.rating < minRating) return false;
      if (onlyInStock && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceVND - b.priceVND;
      if (sortBy === 'price-desc') return b.priceVND - a.priceVND;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.badges?.includes('NEW') ? 1 : -1;
      return b.reviewCount - a.reviewCount;
    });
  }, [products, activeCategory, searchQuery, priceMaxVND, minRating, onlyInStock, sortBy]);

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setPriceMaxVND(6000000);
    setMinRating(0);
    setOnlyInStock(false);
    setSortBy('bestseller');
  };

  return (
    <section className={styles.gridSection}>
      {/* Category Tabs Header */}
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
          {filteredProducts.length} {t.featuredProducts.toLowerCase()}
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolLeft}>
          <button
            onClick={() => setShowFilterSidebar(!showFilterSidebar)}
            className={`${styles.filterToggleBtn} ${showFilterSidebar ? styles.filterToggleActive : ''}`}
          >
            <SlidersHorizontal style={{ width: 16, height: 16 }} />
            <span>{t.filterByPrice}</span>
          </button>

          {(activeCategory !== 'all' || searchQuery || minRating > 0 || priceMaxVND < 6000000 || onlyInStock) && (
            <button
              onClick={resetFilters}
              className={styles.resetBtn}
            >
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

      <div className={styles.mainGridRow}>
        {showFilterSidebar && (
          <aside className={styles.sidebarFilter}>
            <h3 className={styles.filterTitle}>
              Bộ Lọc Chi Tiết
            </h3>

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
              <label className={styles.filterLabel}>
                Đánh giá tối thiểu
              </label>
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
              <span className={styles.stockLabel}>
                {t.inStockOnly}
              </span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className={styles.checkbox}
              />
            </div>
          </aside>
        )}

        <div className={styles.contentArea}>
          {filteredProducts.length === 0 ? (
            <div className={styles.noProductsBox}>
              <FilterX className={styles.noProductsIcon} />
              <h3 className={styles.noProductsTitle}>
                Không tìm thấy sản phẩm phù hợp
              </h3>
              <p className={styles.noProductsDesc}>
                Thử thay đổi từ khóa tìm kiếm hoặc bỏ bớt các bộ lọc.
              </p>
              <button
                onClick={resetFilters}
                className={styles.resetBigBtn}
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div
              className={
                layoutMode === 'grid'
                  ? styles.gridContainerGrid
                  : styles.gridContainerList
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
