import React from 'react';
import { useStore } from '@context/StoreContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './styles.module.scss';

function WishlistDrawer() {
  const {
    t,
    language,
    products,
    wishlist,
    toggleWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    addToCart,
    formatPrice
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      <div className={styles.backdrop}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsWishlistOpen(false)}
          className={styles.backdrop}
        />

        <div className={styles.drawerWrapper}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={styles.drawerCard}
          >
            <div className={styles.drawerHeader}>
              <div className={styles.headerTitle}>
                <Heart className={styles.heartIcon} />
                <h2>
                  {t.wishlist} ({wishlistedProducts.length})
                </h2>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className={styles.closeBtn}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <div className={styles.itemList}>
              {wishlistedProducts.length === 0 ? (
                <div className={styles.emptyBox}>
                  <Heart className={styles.emptyIcon} />
                  <p className={styles.emptyTitle}>
                    Danh sách yêu thích trống
                  </p>
                  <p className={styles.emptyDesc}>
                    Nhấp vào biểu tượng trái tim trên các sản phẩm để lưu lại tại đây!
                  </p>
                </div>
              ) : (
                wishlistedProducts.map((product) => {
                  const title = language === 'EN' && product.titleEn ? product.titleEn : product.title;
                  return (
                    <div
                      key={product.id}
                      className={styles.wishItem}
                    >
                      <img
                        src={product.image}
                        alt={title}
                        className={styles.itemImg}
                      />

                      <div className={styles.itemInfo}>
                        <div>
                          <div className={styles.itemHeader}>
                            <h4 className={styles.itemTitle}>
                              {title}
                            </h4>
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className={styles.removeBtn}
                            >
                              <Trash2 style={{ width: 14, height: 14 }} />
                            </button>
                          </div>
                          <span className={styles.itemPrice}>
                            {formatPrice(product.priceVND, product.priceUSD)}
                          </span>
                        </div>

                        <button
                          onClick={() => addToCart(product, 1)}
                          className={styles.addCartBtn}
                        >
                          <ShoppingBag style={{ width: 14, height: 14 }} />
                          {t.addToCart}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default WishlistDrawer;
