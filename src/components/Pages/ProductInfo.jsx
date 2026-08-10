import React from 'react';
import { useStore } from '@context/StoreContext';
import {
  Star,
  ShoppingBag,
  Heart,
  Check,
  Plus,
  Minus
} from 'lucide-react';
import styles from './styles.module.scss';

function ProductInfo({
  product,
  title,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity
}) {
  const {
    t,
    language,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setIsCheckoutOpen
  } = useStore();

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className={styles.infoCol}>
      <div>
        <div className={styles.catRow}>
          <span className={styles.catName}>{product.categoryLabel}</span>
          <div className={styles.ratingBox}>
            <Star style={{ width: 16, height: 16, fill: '#f59e0b', color: '#f59e0b' }} />
            <span>{product.rating}</span>
            <span style={{ color: '#a8a29e', fontWeight: 400 }}>
              ({product.reviews.length} {t.reviewsCount})
            </span>
          </div>
        </div>

        <h1 className={styles.detailTitle}>{title}</h1>

        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>
            {formatPrice(product.priceVND, product.priceUSD)}
          </span>
          {product.originalPriceVND && (
            <span className={styles.oldPrice}>
              {formatPrice(
                product.originalPriceVND,
                product.originalPriceUSD || product.priceUSD
              )}
            </span>
          )}
        </div>

        <p className={styles.descText}>
          {language === 'EN' && product.descriptionEn
            ? product.descriptionEn
            : product.description}
        </p>

        {product.colors && product.colors.length > 0 && (
          <div className={styles.optSection}>
            <label className={styles.optLabel}>
              {t.selectColor} <span style={{ fontWeight: 700 }}>{selectedColor}</span>
            </label>
            <div className={styles.colorGroup}>
              {product.colors.map((col) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col.name)}
                  className={`${styles.colorBtn} ${selectedColor === col.name ? styles.active : ''}`}
                  style={{ backgroundColor: col.hex }}
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
          <div className={styles.optSection}>
            <label className={styles.optLabel}>{t.selectSize}</label>
            <div className={styles.sizeGroup}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.qtyRow}>
          <span className={styles.optLabel} style={{ marginBottom: 0 }}>
            {t.quantity}
          </span>
          <div className={styles.qtyBox}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className={styles.qtyBtn}
            >
              <Minus style={{ width: 16, height: 16 }} />
            </button>
            <span className={styles.qtyNum}>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className={styles.qtyBtn}
            >
              <Plus style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.actionSection}>
        <div className={styles.btnGrid}>
          <button
            onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
            className={styles.cartBtn}
          >
            <ShoppingBag style={{ width: 16, height: 16 }} />
            {t.addToCart}
          </button>

          <button
            onClick={() => {
              addToCart(product, quantity, selectedColor, selectedSize);
              setIsCheckoutOpen(true);
            }}
            className={styles.buyBtn}
          >
            {t.buyNow}
          </button>
        </div>

        <button onClick={() => toggleWishlist(product.id)} className={styles.wishBtn}>
          <Heart
            style={{
              width: 16,
              height: 16,
              fill: isWishlisted ? '#f43f5e' : 'none',
              color: isWishlisted ? '#f43f5e' : 'currentColor'
            }}
          />
          <span>{isWishlisted ? 'Đã lưu vào Yêu thích' : t.wishlist}</span>
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
