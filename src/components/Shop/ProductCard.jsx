import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@context/StoreContext';
import { Eye, Heart, ShoppingBag, GitCompare, Star } from 'lucide-react';
import styles from './styles.module.scss';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const {
    t,
    language,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setSelectedQuickViewProduct,
    setSelectedProductDetail
  } = useStore();

  const handleProductClick = () => {
    setSelectedProductDetail(product);
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const title = language === 'EN' && product.titleEn ? product.titleEn : product.title;
  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageBox}>
        <img
          src={product.image}
          alt={title}
          onClick={handleProductClick}
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className={styles.badgeList}>
          {product.badges?.map((badge, idx) => {
            const isDiscount = badge.includes('%');
            let badgeClass = styles.badgeDefault;
            if (isDiscount) badgeClass = styles.badgeDiscount;
            else if (badge === 'NEW') badgeClass = styles.badgeNew;
            else if (badge === 'HOT') badgeClass = styles.badgeHot;

            return (
              <span key={idx} className={`${styles.badgeItem} ${badgeClass}`}>
                {badge}
              </span>
            );
          })}
        </div>

        {/* Quick Action Floating Overlay */}
        <div className={styles.quickActions}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`${styles.actionBtn} ${isWishlisted ? styles.actionWishlisted : ''}`}
            title={t.wishlist}
          >
            <Heart style={{ width: 16, height: 16 }} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedQuickViewProduct(product);
            }}
            className={styles.actionBtn}
            title={t.quickView}
          >
            <Eye style={{ width: 16, height: 16 }} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`${styles.actionBtn} ${isCompared ? styles.actionCompared : ''}`}
            title={t.compare}
          >
            <GitCompare style={{ width: 16, height: 16 }} />
          </button>
        </div>

        {/* Hover Add To Cart Bar */}
        <div className={styles.hoverCartBar}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className={styles.hoverCartBtn}
          >
            <ShoppingBag style={{ width: 16, height: 16 }} />
            {t.addToCart}
          </button>
        </div>
      </div>

      <div className={styles.productInfo}>
        <div className={styles.meta}>
          <span className={styles.category}>{product.categoryLabel}</span>

          <div className={styles.rating}>
            <Star style={{ width: 14, height: 14, fill: '#f59e0b', color: '#f59e0b' }} />
            <span>{product.rating}</span>
            <span className={styles.reviewCount}>({product.reviewCount})</span>
          </div>
        </div>

        <h3 onClick={handleProductClick} className={styles.cardTitle}>
          {title}
        </h3>

        <div className={styles.priceBox}>
          <span className={styles.currentPrice}>
            {formatPrice(product.priceVND, product.priceUSD)}
          </span>

          {product.originalPriceVND && (
            <span className={styles.oldPrice}>
              {formatPrice(product.originalPriceVND, product.originalPriceUSD || product.priceUSD)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
