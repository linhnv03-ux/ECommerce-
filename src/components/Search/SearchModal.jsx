import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@context/StoreContext';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './styles.module.scss';

function SearchModal() {
  const {
    t,
    language,
    products,
    isSearchOpen,
    setIsSearchOpen,
    openProductDetail,
    formatPrice
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularKeywords = [
    'Ghế Armchair',
    'Đầm Lụa',
    'Bình Gốm',
    'Nước Hoa',
    'Túi Xách Da',
    'Áo Lanh',
    'Bàn Sồi'
  ];

  const searchResults = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          (p.titleEn && p.titleEn.toLowerCase().includes(q)) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <AnimatePresence>
      <div className={styles.backdrop}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={styles.searchCard}
        >
          <div className={styles.inputWrapper}>
            <Search className={styles.searchIcon} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={styles.searchInput}
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className={styles.closeBtn}
            >
              <X style={{ width: 20, height: 20 }} />
            </button>
          </div>

          {!query.trim() && (
            <div className={styles.popularBox}>
              <div className={styles.trendHeader}>
                <TrendingUp className={styles.trendIcon} />
                <span>Từ khóa tìm kiếm phổ biến</span>
              </div>
              <div className={styles.kwGroup}>
                {popularKeywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setQuery(kw)}
                    className={styles.kwBtn}
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && (
            <div className={styles.resultBox}>
              <div className={styles.resultHeader}>
                <span>Kết quả tìm kiếm cho "{query}"</span>
                <span>{searchResults.length} sản phẩm</span>
              </div>

              {searchResults.length === 0 ? (
                <p className={styles.noResults}>
                  Không tìm thấy sản phẩm nào khớp với từ khóa của bạn.
                </p>
              ) : (
                <div className={styles.resultList}>
                  {searchResults.map((product) => {
                    const title = language === 'EN' && product.titleEn ? product.titleEn : product.title;
                    return (
                      <div
                        key={product.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          openProductDetail(product);
                        }}
                        className={styles.resultItem}
                      >
                        <img
                          src={product.image}
                          alt={title}
                          className={styles.itemImg}
                        />
                        <div className={styles.itemMeta}>
                          <span className={styles.itemCat}>
                            {product.categoryLabel}
                          </span>
                          <h4 className={styles.itemTitle}>
                            {title}
                          </h4>
                          <span className={styles.itemPrice}>
                            {formatPrice(product.priceVND, product.priceUSD)}
                          </span>
                        </div>
                        <ArrowRight className={styles.arrowIcon} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default SearchModal;
