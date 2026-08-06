import React, { useState, useEffect } from 'react';
import { useStore } from '@context/StoreContext';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Check,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './styles.module.scss';

function QuickViewModal() {
  const {
    t,
    language,
    selectedQuickViewProduct,
    setSelectedQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    openProductDetail,
    setIsCheckoutOpen
  } = useStore();

  const product = selectedQuickViewProduct;

  const [selectedImg, setSelectedImg] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImg(product.image);
      setSelectedColor(product.colors?.[0]?.name || '');
      setSelectedSize(product.sizes?.[0] || '');
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const title = language === 'EN' && product.titleEn ? product.titleEn : product.title;
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setSelectedQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setSelectedQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className={styles.quickViewBackdrop}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={styles.quickViewCard}
        >
          <button
            onClick={() => setSelectedQuickViewProduct(null)}
            className={styles.quickViewClose}
          >
            <X style={{ width: 20, height: 20 }} />
          </button>

          <div className={styles.quickViewGrid}>
            <div className={styles.quickViewLeft}>
              <div className={styles.quickImgBox}>
                <img
                  src={selectedImg || product.image}
                  alt={title}
                />
              </div>

              {product.images && product.images.length > 1 && (
                <div className={styles.quickThumbList}>
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(img)}
                      className={`${styles.quickThumbBtn} ${
                        selectedImg === img ? styles.quickThumbActive : ''
                      }`}
                    >
                      <img src={img} alt="thumb" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.quickViewRight}>
              <div>
                <div className={styles.quickHeaderRow}>
                  <span className={styles.quickCatLabel}>
                    {product.categoryLabel}
                  </span>
                  <div className={styles.quickRating}>
                    <Star style={{ width: 14, height: 14, fill: '#f59e0b', color: '#f59e0b' }} />
                    <span>{product.rating}</span>
                    <span className={styles.reviewCount}>({product.reviewCount} {t.reviewsCount})</span>
                  </div>
                </div>

                <h2 className={styles.quickTitle}>
                  {title}
                </h2>

                <div className={styles.quickPriceRow}>
                  <span className={styles.quickPrice}>
                    {formatPrice(product.priceVND, product.priceUSD)}
                  </span>
                  {product.originalPriceVND && (
                    <span className={styles.quickOldPrice}>
                      {formatPrice(product.originalPriceVND, product.originalPriceUSD || product.priceUSD)}
                    </span>
                  )}
                  {product.inStock ? (
                    <span className={`${styles.quickStockBadge} ${styles.inStock}`}>
                      {t.inStock} ({product.stockCount})
                    </span>
                  ) : (
                    <span className={`${styles.quickStockBadge} ${styles.outOfStock}`}>
                      {t.outOfStock}
                    </span>
                  )}
                </div>

                <p className={styles.quickDesc}>
                  {language === 'EN' && product.descriptionEn ? product.descriptionEn : product.description}
                </p>

                {product.colors && product.colors.length > 0 && (
                  <div className={styles.quickOptionGroup}>
                    <label className={styles.quickOptionLabel}>
                      {t.selectColor} <span style={{ fontWeight: 700, color: '#1c1917' }}>{selectedColor}</span>
                    </label>
                    <div className={styles.quickColorList}>
                      {product.colors.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`${styles.quickColorBtn} ${
                            selectedColor === col.name ? styles.quickColorActive : ''
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        >
                          {selectedColor === col.name && (
                            <Check style={{ width: 14, height: 14, color: '#ffffff', mixBlendMode: 'difference' }} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <div className={styles.quickOptionGroup}>
                    <label className={styles.quickOptionLabel}>
                      {t.selectSize}
                    </label>
                    <div className={styles.quickSizeList}>
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`${styles.quickSizeBtn} ${
                            selectedSize === size ? styles.quickSizeActive : ''
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.quickQtyRow}>
                  <span className={styles.quickOptionLabel} style={{ marginBottom: 0 }}>
                    {t.quantity}
                  </span>
                  <div className={styles.quickQtyBox}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className={styles.quickQtyBtn}
                    >
                      <Minus style={{ width: 14, height: 14 }} />
                    </button>
                    <span className={styles.quickQtyNum}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className={styles.quickQtyBtn}
                    >
                      <Plus style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.quickFooter}>
                <div className={styles.quickActionRow}>
                  <button
                    onClick={handleAddToCart}
                    className={styles.quickBtnCart}
                  >
                    <ShoppingBag style={{ width: 16, height: 16 }} />
                    {t.addToCart}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className={styles.quickBtnBuyNow}
                  >
                    {t.buyNow}
                  </button>
                </div>

                <div className={styles.quickSubLinks}>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={styles.quickWishlistBtn}
                  >
                    <Heart style={{ width: 16, height: 16, fill: isWishlisted ? '#f43f5e' : 'none', color: isWishlisted ? '#f43f5e' : 'currentColor' }} />
                    <span>{isWishlisted ? 'Đã yêu thích' : t.wishlist}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedQuickViewProduct(null);
                      openProductDetail(product);
                    }}
                    className={styles.quickDetailLink}
                  >
                    Xem đầy đủ thông tin →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default QuickViewModal;
