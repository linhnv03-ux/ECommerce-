import React, { useState } from 'react';
import { useStore } from '@context/StoreContext';
import ProductCard from '@components/Shop/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Check,
  Plus,
  Minus,
  Send
} from 'lucide-react';
import styles from './styles.module.scss';

function ProductDetailPage() {
  const {
    t,
    language,
    selectedProductDetail,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    setIsCheckoutOpen,
    addToast
  } = useStore();

  const product = selectedProductDetail || products[0];

  const [selectedImg, setSelectedImg] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');

  const [newReview, setNewReview] = useState({ userName: '', rating: 5, comment: '' });

  const title = language === 'EN' && product.titleEn ? product.titleEn : product.title;
  const isWishlisted = isInWishlist(product.id);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.userName.trim() || !newReview.comment.trim()) return;

    product.reviews.unshift({
      id: `rev-${Date.now()}`,
      userName: newReview.userName,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      verifiedPurchase: true
    });

    addToast(
      language === 'VI' ? 'Đã gửi đánh giá của bạn!' : 'Review submitted!',
      'Cảm ơn bạn đã phản hồi về sản phẩm.',
      'success'
    );
    setNewReview({ userName: '', rating: 5, comment: '' });
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.detailGrid}>
        <div className={styles.galleryCol}>
          <div className={styles.mainImgBox}>
            <img
              src={selectedImg || product.image}
              alt={title}
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className={styles.thumbRow}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`${styles.thumbBtn} ${selectedImg === img ? styles.active : ''}`}
                >
                  <img src={img} alt="thumb" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.infoCol}>
          <div>
            <div className={styles.catRow}>
              <span className={styles.catName}>
                {product.categoryLabel}
              </span>
              <div className={styles.ratingBox}>
                <Star style={{ width: 16, height: 16, fill: '#f59e0b', color: '#f59e0b' }} />
                <span>{product.rating}</span>
                <span style={{ color: '#a8a29e', fontWeight: 400 }}>
                  ({product.reviews.length} {t.reviewsCount})
                </span>
              </div>
            </div>

            <h1 className={styles.detailTitle}>
              {title}
            </h1>

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
                <label className={styles.optLabel}>
                  {t.selectSize}
                </label>
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
                <span className={styles.qtyNum}>
                  {quantity}
                </span>
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

            <button
              onClick={() => toggleWishlist(product.id)}
              className={styles.wishBtn}
            >
              <Heart style={{ width: 16, height: 16, fill: isWishlisted ? '#f43f5e' : 'none', color: isWishlisted ? '#f43f5e' : 'currentColor' }} />
              <span>{isWishlisted ? 'Đã lưu vào Yêu thích' : t.wishlist}</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.detailsTabCard}>
        <div className={styles.tabsBar}>
          <button
            onClick={() => setActiveTab('desc')}
            className={`${styles.tabBtn} ${activeTab === 'desc' ? styles.active : ''}`}
          >
            {t.descriptionTab}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`${styles.tabBtn} ${activeTab === 'specs' ? styles.active : ''}`}
          >
            {t.specificationsTab}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.active : ''}`}
          >
            {t.reviewsTab} ({product.reviews.length})
          </button>
        </div>

        <div className={styles.tabBody}>
          {activeTab === 'desc' && (
            <div>
              <p>{product.description}</p>
              {product.features && (
                <ul style={{ paddingLeft: 20, marginTop: 12 }}>
                  {product.features.map((feat, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>{feat}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div style={{ maxWidth: 500 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {Object.entries(product.specifications || {}).map(([key, val], idx) => (
                    <tr
                      key={idx}
                      style={{ borderBottom: '1px solid #e7e5e4', backgroundColor: idx % 2 === 0 ? '#fafaf9' : 'transparent' }}
                    >
                      <td style={{ padding: 8, fontWeight: 600, color: '#78716c', width: '40%' }}>{key}</td>
                      <td style={{ padding: 8, fontWeight: 700, color: '#1c1917' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={{ maxWidth: 700 }}>
              <div style={{ marginBottom: 24 }}>
                {product.reviews.length === 0 ? (
                  <p style={{ color: '#a8a29e', fontSize: 12 }}>Chưa có đánh giá nào cho sản phẩm này.</p>
                ) : (
                  product.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      style={{ padding: 12, borderRadius: 12, backgroundColor: '#fafaf9', border: '1px solid #e7e5e4', marginBottom: 12 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: '#1c1917' }}>
                          {rev.userName}
                        </span>
                        <div style={{ color: '#f59e0b' }}>
                          {'★'.repeat(rev.rating)}
                        </div>
                      </div>
                      <p style={{ color: '#57534e', marginTop: 4 }}>{rev.comment}</p>
                      <span style={{ fontSize: 10, color: '#a8a29e', display: 'block', marginTop: 4 }}>{rev.date}</span>
                    </div>
                  ))
                )}
              </div>

              <form
                onSubmit={handleAddReview}
                style={{ padding: 16, borderRadius: 16, backgroundColor: '#f5f5f4' }}
              >
                <h4 style={{ fontWeight: 700, fontSize: 12, color: '#1c1917', marginBottom: 12 }}>
                  {t.writeReview}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <input
                    type="text"
                    required
                    placeholder="Họ và tên của bạn"
                    value={newReview.userName}
                    onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                    style={{ backgroundColor: '#ffffff', border: '1px solid #e7e5e4', borderRadius: 8, padding: 8, fontSize: 12 }}
                  />
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    style={{ backgroundColor: '#ffffff', border: '1px solid #e7e5e4', borderRadius: 8, padding: 8, fontSize: 12 }}
                  >
                    <option value={5}>5 sao ★★★★★</option>
                    <option value={4}>4 sao ★★★★☆</option>
                    <option value={3}>3 sao ★★★☆☆</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Nhận xét của bạn về sản phẩm..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#ffffff', border: '1px solid #e7e5e4', borderRadius: 8, padding: 8, fontSize: 12, marginBottom: 12 }}
                />
                <button
                  type="submit"
                  style={{ padding: '8px 16px', backgroundColor: '#f59e0b', color: '#1c1917', fontWeight: 700, fontSize: 12, borderRadius: 8, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <Send style={{ width: 14, height: 14 }} />
                  Gửi đánh giá
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1c1917', marginBottom: 24 }}>
            {t.relatedProducts}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
