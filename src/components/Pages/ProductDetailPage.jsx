import React, { useState } from 'react';
import { useStore } from '@context/StoreContext';
import ProductCard from '@components/Shop/ProductCard';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import styles from './styles.module.scss';

function ProductDetailPage() {
  const {
    language,
    selectedProductDetail,
    products,
    t
  } = useStore();

  const product = selectedProductDetail || products[0];

  const [selectedImg, setSelectedImg] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');

  const title = language === 'EN' && product.titleEn ? product.titleEn : product.title;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.detailGrid}>
        <ProductGallery
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          product={product}
          title={title}
        />

        <ProductInfo
          product={product}
          title={title}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>

      <ProductTabs
        product={product}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {relatedProducts.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1c1917', marginBottom: 24 }}>
            {t.relatedProducts}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
