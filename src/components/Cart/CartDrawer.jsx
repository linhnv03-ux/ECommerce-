import React, { useState } from 'react';
import { useStore } from '@context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Truck,
  Tag,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './styles.module.scss';

function CartDrawer() {
  const {
    t,
    language,
    currency,
    cart,
    removeFromCart,
    updateCartQuantity,
    isCartOpen,
    setIsCartOpen,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponStatusMessage, setCouponStatusMessage] = useState(null);

  if (!isCartOpen) return null;

  const subtotalVND = cart.reduce((acc, item) => acc + item.product.priceVND * item.quantity, 0);
  const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

  const freeShipThresholdVND = 500000;
  const freeShipThresholdUSD = 39;

  const currentSubtotal = currency === 'VND' ? subtotalVND : subtotalUSD;
  const currentThreshold = currency === 'VND' ? freeShipThresholdVND : freeShipThresholdUSD;
  const progressPercent = Math.min(100, Math.round((currentSubtotal / currentThreshold) * 100));
  const remainingForFreeShip = Math.max(0, currentThreshold - currentSubtotal);

  let discountVND = 0;
  let discountUSD = 0;

  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountVND = (subtotalVND * appliedCoupon.discountValue) / 100;
      discountUSD = (subtotalUSD * appliedCoupon.discountValue) / 100;
    } else {
      discountVND = appliedCoupon.discountValue;
      discountUSD = appliedCoupon.discountValue / 23000;
    }
  }

  const shippingVND = subtotalVND >= freeShipThresholdVND || cart.length === 0 ? 0 : 30000;
  const shippingUSD = subtotalUSD >= freeShipThresholdUSD || cart.length === 0 ? 0 : 3;

  const totalVND = Math.max(0, subtotalVND - discountVND + shippingVND);
  const totalUSD = Math.max(0, subtotalUSD - discountUSD + shippingUSD);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const result = applyCoupon(couponCodeInput);
    setCouponStatusMessage({ success: result.success, text: result.message });
    if (result.success) {
      setCouponCodeInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className={styles.backdrop}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
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
                <ShoppingBag className={styles.icon} />
                <h2>
                  {t.shoppingCart} ({cart.reduce((acc, i) => acc + i.quantity, 0)})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className={styles.closeBtn}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <div className={styles.shippingProgress}>
              <div className={styles.progressText}>
                <Truck className={styles.truckIcon} />
                {remainingForFreeShip > 0 ? (
                  <span>
                    {t.freeShippingProgress.replace(
                      '{amount}',
                      formatPrice(remainingForFreeShip, remainingForFreeShip)
                    )}
                  </span>
                ) : (
                  <span className={styles.unlocked}>
                    {t.unlockedFreeShipping}
                  </span>
                )}
              </div>
              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className={styles.itemList}>
              {cart.length === 0 ? (
                <div className={styles.emptyBox}>
                  <ShoppingBag className={styles.emptyIcon} />
                  <p className={styles.emptyTitle}>
                    {t.emptyCart}
                  </p>
                  <p className={styles.emptyDesc}>
                    Hãy lựa chọn những sản phẩm ưng ý trong cửa hàng!
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className={styles.shopBtn}
                  >
                    {t.continueShopping}
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => {
                  const title = language === 'EN' && item.product.titleEn ? item.product.titleEn : item.product.title;
                  return (
                    <div
                      key={idx}
                      className={styles.cartItem}
                    >
                      <img
                        src={item.product.image}
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
                              onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                              className={styles.removeBtn}
                              title="Xóa"
                            >
                              <Trash2 style={{ width: 14, height: 14 }} />
                            </button>
                          </div>

                          <div className={styles.itemOptions}>
                            {item.selectedColor && <span>Màu: {item.selectedColor}</span>}
                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          </div>
                        </div>

                        <div className={styles.itemFooter}>
                          <div className={styles.qtyControl}>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                  item.selectedColor,
                                  item.selectedSize
                                )
                              }
                              className={styles.qtyBtn}
                            >
                              <Minus style={{ width: 12, height: 12 }} />
                            </button>
                            <span className={styles.qtyNum}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                  item.selectedColor,
                                  item.selectedSize
                                )
                              }
                              className={styles.qtyBtn}
                            >
                              <Plus style={{ width: 12, height: 12 }} />
                            </button>
                          </div>

                          <span className={styles.itemPrice}>
                            {formatPrice(
                              item.product.priceVND * item.quantity,
                              item.product.priceUSD * item.quantity
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className={styles.drawerFooter}>
                {appliedCoupon ? (
                  <div className={styles.appliedTag}>
                    <div className={styles.tagInfo}>
                      <Tag style={{ width: 16, height: 16, color: '#059669' }} />
                      <span>{appliedCoupon.code} ({appliedCoupon.description})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className={styles.removeTagBtn}
                    >
                      Bỏ mã
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className={styles.couponForm}>
                    <input
                      type="text"
                      placeholder={t.promoCode}
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      className={styles.couponInput}
                    />
                    <button
                      type="submit"
                      className={styles.applyBtn}
                    >
                      {t.applyCoupon}
                    </button>
                  </form>
                )}

                {couponStatusMessage && !appliedCoupon && (
                  <p className={`${styles.statusMsg} ${couponStatusMessage.success ? styles.success : styles.error}`}>
                    {couponStatusMessage.text}
                  </p>
                )}

                <div className={styles.summaryRows}>
                  <div className={styles.row}>
                    <span>{t.subtotal}</span>
                    <span style={{ fontWeight: 600, color: '#1c1917' }}>
                      {formatPrice(subtotalVND, subtotalUSD)}
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className={styles.row} style={{ color: '#059669', fontWeight: 600 }}>
                      <span>{t.discount}</span>
                      <span>-{formatPrice(discountVND, discountUSD)}</span>
                    </div>
                  )}

                  <div className={styles.row}>
                    <span>{t.shippingFee}</span>
                    <span>
                      {shippingVND === 0
                        ? 'Miễn phí'
                        : formatPrice(shippingVND, shippingUSD)}
                    </span>
                  </div>

                  <div className={styles.totalRow}>
                    <span>{t.totalAmount}</span>
                    <span className={styles.totalPrice}>
                      {formatPrice(totalVND, totalUSD)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleProceedCheckout}
                  className={styles.checkoutBtn}
                >
                  {t.proceedToCheckout}
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default CartDrawer;
