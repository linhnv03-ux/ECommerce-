import React from 'react';
import { useStore } from '@context/StoreContext';
import { X, GitCompare, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './styles.module.scss';

function CompareModal() {
  const {
    t,
    language,
    compareList,
    toggleCompare,
    isCompareOpen,
    setIsCompareOpen,
    addToCart,
    formatPrice
  } = useStore();

  if (!isCompareOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.backdrop}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={styles.modalCard}
        >
          <div className={styles.modalHeader}>
            <div className={styles.headerTitle}>
              <GitCompare className={styles.icon} />
              <h2>
                So sánh sản phẩm ({compareList.length}/4)
              </h2>
            </div>
            <button
              onClick={() => setIsCompareOpen(false)}
              className={styles.closeBtn}
            >
              <X style={{ width: 20, height: 20 }} />
            </button>
          </div>

          {compareList.length === 0 ? (
            <div className={styles.emptyBox}>
              <GitCompare className={styles.emptyIcon} />
              <p className={styles.emptyTitle}>
                Chưa có sản phẩm nào trong danh sách so sánh
              </p>
              <p className={styles.emptyDesc}>
                Nhấp vào nút So sánh trên thẻ sản phẩm để chọn từ 2 đến 4 sản phẩm.
              </p>
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th className={styles.featureCol}>
                      Tính năng
                    </th>
                    {compareList.map((product) => {
                      const title = language === 'EN' && product.titleEn ? product.titleEn : product.title;
                      return (
                        <th key={product.id} className={styles.productHead}>
                          <div className={styles.productCardHead}>
                            <button
                              onClick={() => toggleCompare(product)}
                              className={styles.removeBtn}
                              title="Bỏ so sánh"
                            >
                              <X style={{ width: 14, height: 14 }} />
                            </button>
                            <img
                              src={product.image}
                              alt={title}
                              className={styles.headImg}
                            />
                            <h4 className={styles.headTitle}>
                              {title}
                            </h4>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.featureCol}>
                      Giá bán
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className={styles.priceCell}>
                        {formatPrice(p.priceVND, p.priceUSD)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className={styles.featureCol}>
                      Danh mục
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} style={{ color: '#44403c' }}>
                        {p.categoryLabel}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className={styles.featureCol}>
                      Đánh giá
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} style={{ color: '#f59e0b', fontWeight: 700 }}>
                        ★ {p.rating} ({p.reviewCount})
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className={styles.featureCol}>
                      Tình trạng
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id}>
                        <span className={`${styles.stockBadge} ${p.inStock ? styles.inStock : styles.outOfStock}`}>
                          {p.inStock ? `${t.inStock} (${p.stockCount})` : t.outOfStock}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className={styles.featureCol}>
                      Hành động
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id}>
                        <button
                          onClick={() => addToCart(p, 1)}
                          className={styles.cartBtn}
                        >
                          <ShoppingBag style={{ width: 14, height: 14 }} />
                          {t.addToCart}
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CompareModal;
