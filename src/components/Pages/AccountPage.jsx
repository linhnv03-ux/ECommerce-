import React, { useState } from 'react';
import { useStore } from '@context/StoreContext';
import { Package, Heart, MapPin, Phone, Mail } from 'lucide-react';
import styles from './styles.module.scss';

function AccountPage() {
  const { userOrders, wishlist, products, formatPrice, setActiveView, openProductDetail } = useStore();
  const [activeTab, setActiveTab] = useState('orders');

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.userHeaderCard}>
        <div className={styles.avatar}>
          VL
        </div>

        <div className={styles.userInfo}>
          <h1 className={styles.userName}>
            Nguyễn Văn Linh
          </h1>
          <div className={styles.userMetaRow}>
            <span className={styles.metaItem}>
              <Mail className={styles.icon} style={{ width: 14, height: 14 }} />
              vanlinh@example.com
            </span>
            <span className={styles.metaItem}>
              <Phone className={styles.icon} style={{ width: 14, height: 14 }} />
              0988 123 456
            </span>
            <span className={styles.metaItem}>
              <MapPin className={styles.icon} style={{ width: 14, height: 14 }} />
              Quận 1, TP. Hồ Chí Minh
            </span>
          </div>
        </div>

        <div className={styles.vipBadge}>
          <span>Khách hàng VIP Marseille</span>
        </div>
      </div>

      <div className={styles.accountMainCard}>
        <div className={styles.tabsHeader}>
          <button
            onClick={() => setActiveTab('orders')}
            className={`${styles.tabBtn} ${activeTab === 'orders' ? styles.active : ''}`}
          >
            <Package style={{ width: 16, height: 16 }} />
            Lịch sử Đơn hàng ({userOrders.length})
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`${styles.tabBtn} ${activeTab === 'wishlist' ? styles.active : ''}`}
          >
            <Heart style={{ width: 16, height: 16 }} />
            Yêu thích ({wishlistedProducts.length})
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'orders' && (
            <div>
              {userOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0', color: '#a8a29e' }}>
                  <Package style={{ width: 48, height: 48, strokeWidth: 1, color: '#d6d3d1', margin: '0 auto 8px auto' }} />
                  <p style={{ fontWeight: 600, fontSize: 12, color: '#44403c' }}>
                    Bạn chưa có đơn hàng nào
                  </p>
                  <button
                    onClick={() => setActiveView('shop')}
                    style={{ marginTop: 12, padding: '8px 16px', backgroundColor: '#f59e0b', color: '#1c1917', fontWeight: 700, fontSize: 12, borderRadius: 12, border: 'none', cursor: 'pointer' }}
                  >
                    Khám phá cửa hàng ngay
                  </button>
                </div>
              ) : (
                userOrders.map((order) => (
                  <div
                    key={order.id}
                    className={styles.orderCard}
                  >
                    <div className={styles.orderHead}>
                      <div>
                        <span className={styles.orderId}>
                          #{order.id}
                        </span>
                        <span className={styles.orderDate}>{order.date}</span>
                      </div>
                      <span className={styles.statusBadge}>
                        {order.status === 'processing' ? 'Đang xử lý' : 'Đã hoàn thành'}
                      </span>
                    </div>

                    <div className={styles.orderItems}>
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

                    <div className={styles.orderFoot}>
                      <span style={{ color: '#78716c' }}>Tổng tiền thanh toán</span>
                      <span className={styles.total}>
                        {formatPrice(order.totalVND, order.totalUSD)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className={styles.wishGrid}>
              {wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => openProductDetail(product)}
                  className={styles.wishCard}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.wishImg}
                  />
                  <h4 className={styles.wishTitle}>
                    {product.title}
                  </h4>
                  <span className={styles.wishPrice}>
                    {formatPrice(product.priceVND, product.priceUSD)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
