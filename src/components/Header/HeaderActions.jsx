import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@context/StoreContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  GitCompare
} from 'lucide-react';
import styles from './styles.module.scss';

function HeaderActions() {
  const navigate = useNavigate();
  const {
    t,
    cart,
    wishlist,
    compareList,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsCompareOpen,
    formatPrice
  } = useStore();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotalVND = cart.reduce((acc, item) => acc + item.product.priceVND * item.quantity, 0);
  const cartSubtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

  return (
    <div className={styles.actions}>
      <button onClick={() => setIsSearchOpen(true)} className={styles.iconBtn} title={t.searchPlaceholder}>
        <Search style={{ width: 20, height: 20 }} />
      </button>

      <button
        onClick={() => {
          navigate('/account');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={styles.iconBtn}
        title={t.myAccount}
      >
        <User style={{ width: 20, height: 20 }} />
      </button>

      <button onClick={() => setIsCompareOpen(true)} className={`${styles.iconBtn} ${styles.hideMobile}`} title={t.compare}>
        <GitCompare style={{ width: 20, height: 20 }} />
        {compareList.length > 0 && (
          <span className={styles.badge}>
            {compareList.length}
          </span>
        )}
      </button>

      <button onClick={() => setIsWishlistOpen(true)} className={styles.iconBtn} title={t.wishlist}>
        <Heart style={{ width: 20, height: 20 }} />
        {wishlist.length > 0 && (
          <span className={`${styles.badge} ${styles.roseBadge}`}>
            {wishlist.length}
          </span>
        )}
      </button>

      <button onClick={() => setIsCartOpen(true)} className={styles.cartBtn}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ShoppingBag style={{ width: 20, height: 20 }} />
          {cartItemsCount > 0 && (
            <span className={styles.cartBadge}>
              {cartItemsCount}
            </span>
          )}
        </div>
        <span className={styles.cartAmount}>
          {formatPrice(cartSubtotalVND, cartSubtotalUSD)}
        </span>
      </button>
    </div>
  );
}

export default HeaderActions;
