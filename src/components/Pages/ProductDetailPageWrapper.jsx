import React from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import ProductDetailPage from './ProductDetailPage';

function ProductDetailPageWrapper() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <ProductDetailPage />
      </main>
      <Footer />
    </>
  );
}

export default ProductDetailPageWrapper;
