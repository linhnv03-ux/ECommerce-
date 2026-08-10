import React from 'react';
import { FilterX } from 'lucide-react';
import styles from './styles.module.scss';

function NoProductsFound({ resetFilters }) {
  return (
    <div className={styles.noProductsBox}>
      <FilterX className={styles.noProductsIcon} />
      <h3 className={styles.noProductsTitle}>Không tìm thấy sản phẩm phù hợp</h3>
      <p className={styles.noProductsDesc}>
        Thử thay đổi từ khóa tìm kiếm hoặc bỏ bớt các bộ lọc.
      </p>
      <button onClick={resetFilters} className={styles.resetBigBtn}>
        Đặt lại bộ lọc
      </button>
    </div>
  );
}

export default NoProductsFound;
