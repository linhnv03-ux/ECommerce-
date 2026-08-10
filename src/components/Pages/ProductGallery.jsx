import React from 'react';
import styles from './styles.module.scss';

function ProductGallery({ selectedImg, setSelectedImg, product, title }) {
  return (
    <div className={styles.galleryCol}>
      <div className={styles.mainImgBox}>
        <img
          src={selectedImg || product.image}
          alt={title}
        />
      </div>

      {product.images && product.images.length > 1 && (
        <div className={styles.thumbRow}>
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImg(img)}
              className={`${styles.thumbBtn} ${selectedImg === img ? styles.active : ''}`}
            >
              <img src={img} alt="thumb" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
