import React from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import CartDrawer from '@components/Cart/CartDrawer';
import WishlistDrawer from '@components/Wishlist/WishlistDrawer';
import SearchModal from '@components/Search/SearchModal';
import CheckoutModal from '@components/Checkout/CheckoutModal';
import CompareModal from '@components/Compare/CompareModal';
import ToastContainer from '@components/Toast/ToastContainer';
import styles from './styles.module.scss';

function MainLayout({ children }) {
  const { layoutWrapper, mainContent } = styles;

  return (
    <div className={layoutWrapper}>
      <Header />
      <main className={mainContent}>{children}</main>
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <CheckoutModal />
      <CompareModal />
      <ToastContainer />
    </div>
  );
}

export default MainLayout;
