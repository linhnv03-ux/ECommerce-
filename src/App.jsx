import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routers from '@routers/routers';
import { StoreProvider } from '@context/StoreContext';
import QuickViewModal from '@components/Shop/QuickViewModal';
import CartDrawer from '@components/Cart/CartDrawer';
import WishlistDrawer from '@components/Wishlist/WishlistDrawer';
import CompareModal from '@components/Compare/CompareModal';
import SearchModal from '@components/Search/SearchModal';
import CheckoutModal from '@components/Checkout/CheckoutModal';
import ToastContainer from '@components/Toast/ToastContainer';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-stone-500 font-medium">Loading...</div>}>
        <Routes>
          {routers.map((item, index) => {
            const Component = item.component;
            return (
              <Route
                path={item.path}
                element={<Component />}
                key={index}
              />
            );
          })}
        </Routes>
      </Suspense>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <CompareModal />
      <QuickViewModal />
      <SearchModal />
      <CheckoutModal />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  );
}
