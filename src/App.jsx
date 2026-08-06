import React from 'react';
import { StoreProvider, useStore } from '@context/StoreContext';
import Header from '@components/Header/Header';
import HeroBanner from '@components/Hero/HeroBanner';
import InfoBar from '@components/InfoBar/InfoBar';
import FlashSaleBanner from '@components/Shop/FlashSaleBanner';
import ProductGrid from '@components/Shop/ProductGrid';
import QuickViewModal from '@components/Shop/QuickViewModal';
import CartDrawer from '@components/Cart/CartDrawer';
import WishlistDrawer from '@components/Wishlist/WishlistDrawer';
import CompareModal from '@components/Compare/CompareModal';
import SearchModal from '@components/Search/SearchModal';
import CheckoutModal from '@components/Checkout/CheckoutModal';
import OrderSuccessPage from '@components/Checkout/OrderSuccessPage';
import ProductDetailPage from '@components/Pages/ProductDetailPage';
import AboutUs from '@components/Pages/AboutUs';
import ContactUs from '@components/Pages/ContactUs';
import AccountPage from '@components/Pages/AccountPage';
import Footer from '@components/Footer/Footer';
import ToastContainer from '@components/Toast/ToastContainer';

function MainLayout() {
  const { activeView } = useStore();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950">
      <div>
        <Header />

        <main>
          {activeView === 'home' && (
            <>
              <HeroBanner />
              <InfoBar />
              <FlashSaleBanner />
              <ProductGrid />
            </>
          )}

          {activeView === 'shop' && <ProductGrid />}

          {activeView === 'product-detail' && <ProductDetailPage />}

          {activeView === 'about' && <AboutUs />}

          {activeView === 'contact' && <ContactUs />}

          {activeView === 'account' && <AccountPage />}

          {activeView === 'checkout-success' && <OrderSuccessPage />}
        </main>
      </div>

      <Footer />

      {/* Overlays & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <CompareModal />
      <QuickViewModal />
      <SearchModal />
      <CheckoutModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
