import React, { useState, useMemo } from 'react';
import { useStore } from '@context/StoreContext';
import ProductCard from './ProductCard';
import CategoryTabs from './CategoryTabs';
import ShopToolbar from './ShopToolbar';
import FilterSidebar from './FilterSidebar';
import NoProductsFound from './NoProductsFound';
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

  const hasActiveFilters = activeCategory !== 'all' || searchQuery || minRating > 0 || priceMaxVND < 6000000 || onlyInStock;

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
      <CategoryTabs categories={categories} count={filteredProducts.length} />

      <ShopToolbar
        showFilterSidebar={showFilterSidebar}
        setShowFilterSidebar={setShowFilterSidebar}
        hasActiveFilters={hasActiveFilters}
        resetFilters={resetFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
      />

      <div className={styles.mainGridRow}>
        {showFilterSidebar && (
          <FilterSidebar
            priceMaxVND={priceMaxVND}
            setPriceMaxVND={setPriceMaxVND}
            minRating={minRating}
            setMinRating={setMinRating}
            onlyInStock={onlyInStock}
            setOnlyInStock={setOnlyInStock}
          />
        )}

        <div className={styles.contentArea}>
          {filteredProducts.length === 0 ? (
            <NoProductsFound resetFilters={resetFilters} />
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
