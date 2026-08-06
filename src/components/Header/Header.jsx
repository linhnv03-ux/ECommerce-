import React from 'react';
import { useStore } from '@context/StoreContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  GitCompare,
  Menu,
  X,
  Phone,
  Mail,
  Globe,
  ChevronDown
} from 'lucide-react';
import styles from './styles.module.scss';

function Header() {
  const {
    t,
    language,
    setLanguage,
    currency,
    setCurrency,
    cart,
    wishlist,
    compareList,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsCompareOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activeView,
    setActiveView,
    setActiveCategory,
    formatPrice
  } = useStore();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotalVND = cart.reduce((acc, item) => acc + item.product.priceVND * item.quantity, 0);
  const cartSubtotalUSD = cart.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

  const handleCategoryNav = (catKey) => {
    setActiveCategory(catKey);
    setActiveView('shop');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={styles.headerWrapper}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topInner}>
          <div className={styles.contactGroup}>
            <span className={styles.contactItem}>
              <Phone className={styles.phoneIcon} />
              +84 1900 6868
            </span>
            <span className={`${styles.contactItem} ${styles.hideMobile}`}>
              <Mail className={styles.mailIcon} />
              support@xstore-marseille.com
            </span>
          </div>

          <div className={styles.announcement}>{t.announcement}</div>

          <div className={styles.rightOptions}>
            <button
              onClick={() => setLanguage(language === 'VI' ? 'EN' : 'VI')}
              className={styles.optionBtn}
            >
              <Globe style={{ width: 12, height: 12 }} />
              {language}
            </button>
            <button
              onClick={() => setCurrency(currency === 'VND' ? 'USD' : 'VND')}
              className={styles.optionBtn}
            >
              {currency === 'VND' ? '₫ VND' : '$ USD'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={styles.mainHeader}>
        {/* Left Nav */}
        <div className={styles.leftSection}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.mobileToggle}
          >
            {isMobileMenuOpen ? <X style={{ width: 24, height: 24 }} /> : <Menu style={{ width: 24, height: 24 }} />}
          </button>

          <nav className={styles.navMenu}>
            <button
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={activeView === 'home' ? styles.active : ''}
            >
              {t.navHome}
            </button>

            <button
              onClick={() => {
                setActiveView('shop');
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={activeView === 'shop' ? styles.active : ''}
            >
              {t.navShop}
            </button>

            <div className={styles.dropdownGroup}>
              <button className={styles.dropdownTrigger}>
                {t.navElements}
                <ChevronDown className={styles.chevron} />
              </button>

              <div className={styles.dropdownMenu}>
                <button onClick={() => handleCategoryNav('furniture')} className={styles.dropdownItem}>
                  {t.furniture}
                </button>
                <button onClick={() => handleCategoryNav('fashion')} className={styles.dropdownItem}>
                  {t.fashion}
                </button>
                <button onClick={() => handleCategoryNav('decor')} className={styles.dropdownItem}>
                  {t.decor}
                </button>
                <button onClick={() => handleCategoryNav('beauty')} className={styles.dropdownItem}>
                  {t.beauty}
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={activeView === 'about' ? styles.active : ''}
            >
              {t.navAbout}
            </button>

            <button
              onClick={() => {
                setActiveView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={activeView === 'contact' ? styles.active : ''}
            >
              {t.navContact}
            </button>
          </nav>
        </div>

        {/* Center Logo */}
        <div
          className={styles.logo}
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className={styles.logoText}>XStore</span>
          <span className={styles.logoSub}>Marseille04</span>
        </div>

        {/* Right Actions */}
        <div className={styles.actions}>
          <button onClick={() => setIsSearchOpen(true)} className={styles.iconBtn} title={t.searchPlaceholder}>
            <Search style={{ width: 20, height: 20 }} />
          </button>

          <button
            onClick={() => {
              setActiveView('account');
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
      </div>
    </header>
  );
}

export default Header;
