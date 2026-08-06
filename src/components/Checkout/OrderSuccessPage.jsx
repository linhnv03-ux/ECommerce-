import React from 'react';
import { useStore } from '@context/StoreContext';
import { CheckCircle2, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import styles from './styles.module.scss';

function OrderSuccessPage() {
  const { t, lastCreatedOrder, setActiveView, formatPrice } = useStore();

  if (!lastCreatedOrder) {
    return (
      <div className={styles.successPageWrapper} style={{ textAlign: 'center' }}>
        <p style={{ color: '#78716c' }}>Chưa tìm thấy thông tin đơn hàng mới.</p>
        <button
          onClick={() => setActiveView('home')}
          className={styles.shopBtn}
          style={{ marginTop: 16 }}
        >
          Trở về Trang chủ
        </button>
      </div>
    );
  }

  const order = lastCreatedOrder;

  return (
    <div className={styles.successPageWrapper}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.successCard}
      >
        <div className={styles.checkIconBox}>
          <CheckCircle2 style={{ width: 40, height: 40 }} />
        </div>

        <div>
          <h1 className={styles.successTitle}>
            {t.orderSuccessTitle}
          </h1>
          <p className={styles.successSub}>
            {t.orderSuccessDesc}{' '}
            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#d97706' }}>
              #{order.id}
            </span>
          </p>
        </div>

        <div className={styles.orderDetailCard}>
          <div className={styles.detailHead}>
            <div>
              <span className={styles.label}>Ngày đặt hàng</span>
              <span className={styles.value}>{order.date}</span>
            </div>
            <div>
              <span className={styles.label}>Trạng thái</span>
              <span className={styles.badge}>
                Đang xử lý
              </span>
            </div>
            <div>
              <span className={styles.label}>Tổng tiền</span>
              <span className={styles.value} style={{ color: '#d97706', fontSize: 14, fontWeight: 800 }}>
                {formatPrice(order.totalVND, order.totalUSD)}
              </span>
            </div>
          </div>

          <div className={styles.addressSection}>
            <div className={styles.addrTitle}>
              <MapPin style={{ width: 16, height: 16, color: '#f59e0b' }} />
              <span>Địa chỉ nhận hàng:</span>
            </div>
            <p className={styles.addrText}>
              {order.shippingAddress.fullName} ({order.shippingAddress.phone})
              <br />
              {order.shippingAddress.address}, {order.shippingAddress.district},{' '}
              {order.shippingAddress.city}
            </p>
          </div>

          <div className={styles.itemsSection}>
            <span className={styles.itemsTitle}>
              Sản phẩm đã mua:
            </span>
            <div>
              {order.items.map((item, idx) => (
                <div key={idx} className={styles.itemRow}>
                  <span className={styles.name}>
                    {item.product.title} x {item.quantity}
                  </span>
                  <span className={styles.price}>
                    {formatPrice(
                      item.product.priceVND * item.quantity,
                      item.product.priceUSD * item.quantity
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.btnGroup}>
          <button
            onClick={() => setActiveView('shop')}
            className={styles.shopBtn}
          >
            <ShoppingBag style={{ width: 16, height: 16 }} />
            Tiếp tục Mua sắm
          </button>

          <button
            onClick={() => setActiveView('account')}
            className={styles.accountBtn}
          >
            Quản lý Đơn hàng
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default OrderSuccessPage;
