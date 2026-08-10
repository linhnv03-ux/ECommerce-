import React from 'react';
import ProductCard from '@components/Shop/ProductCard';
import styles from './styles.module.scss';

function HeadingListProducts({ data = [] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {data.map((product) => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeadingListProducts;
