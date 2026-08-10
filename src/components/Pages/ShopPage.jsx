import React from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import ProductGrid from '@components/Shop/ProductGrid';

function ShopPage() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <ProductGrid />
      </main>
      <Footer />
    </>
  );
}

export default ShopPage;
