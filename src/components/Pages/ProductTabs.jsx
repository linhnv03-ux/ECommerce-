import React, { useState } from 'react';
import { useStore } from '@context/StoreContext';
import { Star, MessageSquare } from 'lucide-react';
import styles from './styles.module.scss';

function ProductTabs({ product, activeTab, setActiveTab }) {
  const { t, language, addReview } = useStore();

  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    addReview(product.id, {
      name: reviewName,
      comment: reviewComment,
      rating: Number(reviewRating)
    });

    setReviewName('');
    setReviewComment('');
  };

  return (
    <div className={styles.tabsSection}>
      <div className={styles.tabHeaders}>
        <button
          onClick={() => setActiveTab('desc')}
          className={`${styles.tabHeaderBtn} ${activeTab === 'desc' ? styles.active : ''}`}
        >
          {t.productDesc}
        </button>
        <button
          onClick={() => setActiveTab('specs')}
          className={`${styles.tabHeaderBtn} ${activeTab === 'specs' ? styles.active : ''}`}
        >
          {t.productSpecs}
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`${styles.tabHeaderBtn} ${activeTab === 'reviews' ? styles.active : ''}`}
        >
          {t.reviewsCount} ({product.reviews.length})
        </button>
      </div>

      <div className={styles.tabBody}>
        {activeTab === 'desc' && (
          <div className={styles.tabDesc}>
            <p>
              {language === 'EN' && product.descriptionEn
                ? product.descriptionEn
                : product.description}
            </p>
            <p>
              Sản phẩm được thiết kế và sản xuất dưới quy trình kiểm soát chất lượng nghiêm ngặt của XStore Marseille04. Sử dụng chất liệu bền bỉ, cao cấp mang tới trải nghiệm tuyệt vời và sang trọng cho không gian sống cũng như phong cách riêng của bạn.
            </p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className={styles.specsTable}>
            {product.specs && Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className={styles.specRow}>
                <span className={styles.specKey}>{k}</span>
                <span className={styles.specVal}>{v}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className={styles.reviewsBox}>
            <div className={styles.reviewsList}>
              {product.reviews.length === 0 ? (
                <p className={styles.noReviews}>Chưa có đánh giá nào cho sản phẩm này.</p>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className={styles.reviewCard}>
                    <div className={styles.revHeader}>
                      <span className={styles.revName}>{rev.userName}</span>
                      <span className={styles.revDate}>{rev.date}</span>
                    </div>
                    <div className={styles.revStars}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          style={{
                            width: 14,
                            height: 14,
                            fill: i < rev.rating ? '#f59e0b' : 'none',
                            color: i < rev.rating ? '#f59e0b' : '#d6d3d1'
                          }}
                        />
                      ))}
                    </div>
                    <p className={styles.revComment}>{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
              <h4 className={styles.formTitle}>
                <MessageSquare style={{ width: 16, height: 16 }} />
                Viết đánh giá của bạn
              </h4>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Đánh giá (sao)</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(e.target.value)}
                  >
                    <option value="5">5 Sao - Rất hài lòng</option>
                    <option value="4">4 Sao - Hài lòng</option>
                    <option value="3">3 Sao - Bình thường</option>
                    <option value="2">2 Sao - Kém</option>
                    <option value="1">1 Sao - Tệ</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Nội dung đánh giá *</label>
                <textarea
                  rows="3"
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                ></textarea>
              </div>

              <button type="submit" className={styles.submitRevBtn}>
                Gửi đánh giá
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductTabs;
