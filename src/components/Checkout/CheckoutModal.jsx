import React, { useState } from 'react';
import { useStore } from '@context/StoreContext';
import {
  X,
  QrCode,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './styles.module.scss';

function CheckoutModal() {
  const {
    t,
    cart,
    appliedCoupon,
    isCheckoutOpen,
    setIsCheckoutOpen,
    formatPrice,
    placeOrder
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Văn Linh',
    phone: '0988123456',
    email: 'vanlinh@example.com',
    address: '123 Phố Marseille, Phường Bến Nghé',
    city: 'Hồ Chí Minh',
    district: 'Quận 1',
    notes: 'Giao hàng giờ hành chính giúp tôi'
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  if (!isCheckoutOpen || cart.length === 0) return null;

  const subtotalVND = cart.reduce((acc, item) => acc + item.product.priceVND * item.quantity, 0);
  const subtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

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

  const shippingVND = subtotalVND >= 500000 ? 0 : 30000;
  const shippingUSD = subtotalUSD >= 39 ? 0 : 3;

  const totalVND = Math.max(0, subtotalVND - discountVND + shippingVND);
  const totalUSD = Math.max(0, subtotalUSD - discountUSD + shippingUSD);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) return;
    placeOrder(formData, paymentMethod);
  };

  return (
    <AnimatePresence>
      <div className={styles.backdrop}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={styles.checkoutCard}
        >
          <div className={styles.checkoutHeader}>
            <div className={styles.headerTitle}>
              <ShieldCheck className={styles.shieldIcon} />
              <h2>
                {t.checkoutTitle}
              </h2>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className={styles.closeBtn}
            >
              <X style={{ width: 20, height: 20 }} />
            </button>
          </div>

          <form onSubmit={handleSubmitOrder} className={styles.checkoutGrid}>
            <div className={styles.leftCol}>
              <div className={styles.stepSection}>
                <h3 className={styles.stepTitle}>
                  <span className={styles.stepNum}>
                    1
                  </span>
                  {t.shippingInfo}
                </h3>

                <div className={styles.formGrid}>
                  <div className={styles.fieldGroup}>
                    <label>
                      {t.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label>
                      {t.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                    <label>
                      {t.email}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                    <label>
                      {t.address} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label>
                      {t.city}
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label>
                      {t.district}
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    />
                  </div>

                  <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                    <label>
                      {t.orderNotes}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.stepSection}>
                <h3 className={styles.stepTitle}>
                  <span className={styles.stepNum}>
                    2
                  </span>
                  {t.paymentMethod}
                </h3>

                <div className={styles.paymentMethods}>
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`${styles.payCard} ${
                      paymentMethod === 'cod' ? styles.active : ''
                    }`}
                  >
                    <Truck style={{ width: 20, height: 20, color: '#d97706' }} />
                    <div>
                      <div className={styles.payTitle}>{t.codPayment}</div>
                      <span className={styles.payDesc}>
                        Thanh toán bằng tiền mặt trực tiếp cho shipper khi nhận hàng
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('momo_qr')}
                    className={`${styles.payCard} ${
                      paymentMethod === 'momo_qr' ? styles.active : ''
                    }`}
                  >
                    <QrCode style={{ width: 20, height: 20, color: '#d97706' }} />
                    <div>
                      <div className={styles.payTitle}>{t.momoPayment}</div>
                      <span className={styles.payDesc}>
                        Quét mã VietQR / MoMo / ZaloPay tự động xác nhận
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.rightCol}>
              <div>
                <h3 className={styles.summaryTitle}>
                  Tóm tắt Đơn hàng ({cart.length})
                </h3>

                <div className={styles.summaryItems}>
                  {cart.map((item, idx) => (
                    <div key={idx} className={styles.summaryItem}>
                      <img
                        src={item.product.image}
                        alt="item"
                        className={styles.itemImg}
                      />
                      <div className={styles.itemMeta}>
                        <h4 className={styles.itemTitle}>
                          {item.product.title}
                        </h4>
                        <span className={styles.itemQty}>Số lượng: {item.quantity}</span>
                      </div>
                      <span className={styles.itemPrice}>
                        {formatPrice(
                          item.product.priceVND * item.quantity,
                          item.product.priceUSD * item.quantity
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={styles.summaryBreakdown}>
                  <div className={styles.row}>
                    <span>Tạm tính</span>
                    <span>{formatPrice(subtotalVND, subtotalUSD)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className={styles.row} style={{ color: '#059669', fontWeight: 600 }}>
                      <span>Giảm giá ({appliedCoupon.code})</span>
                      <span>-{formatPrice(discountVND, discountUSD)}</span>
                    </div>
                  )}
                  <div className={styles.row}>
                    <span>Phí vận chuyển</span>
                    <span>{shippingVND === 0 ? 'Miễn phí' : formatPrice(shippingVND, shippingUSD)}</span>
                  </div>

                  <div className={styles.totalRow}>
                    <span>Tổng thanh toán</span>
                    <span className={styles.totalPrice}>
                      {formatPrice(totalVND, totalUSD)}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.submitBox}>
                <div className={styles.sslNote}>
                  <Lock style={{ width: 14, height: 14, color: '#10b981' }} />
                  <span>Mã hóa SSL 256-bit An Toàn Tuyệt Đối</span>
                </div>

                <button
                  type="submit"
                  className={styles.placeOrderBtn}
                >
                  <CheckCircle2 style={{ width: 20, height: 20 }} />
                  {t.placeOrder}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CheckoutModal;
