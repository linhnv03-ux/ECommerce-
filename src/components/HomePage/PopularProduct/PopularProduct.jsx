import React from 'react';
import ProductGrid from '@components/Shop/ProductGrid';
import ProductCard from '@components/Shop/ProductCard';
import styles from './styles.module.scss';

function PopularProduct({ data = [] }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {data && data.length > 0 ? (
          <div className={styles.grid}>
            {data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <ProductGrid />
        )}
      </div>
    </div>
  );
}

export default PopularProduct;
