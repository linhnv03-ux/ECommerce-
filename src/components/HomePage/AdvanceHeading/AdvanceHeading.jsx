import React from 'react';
import { useStore } from '@context/StoreContext';
import { Sparkles, Compass } from 'lucide-react';
import styles from './styles.module.scss';

function AdvanceHeading() {
  const { t } = useStore();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.badge}>
          <Sparkles style={{ width: 14, height: 14 }} />
          <span>XSTORE MARSEILLE04 COLLECTION</span>
        </div>
        <h2 className={styles.title}>
          {t.featuredProducts || 'Sản Phẩm Nổi Bật'}
        </h2>
        <p className={styles.subtitle}>
          Tuyển chọn những thiết kế kiến trúc nội thất & thời trang đỉnh cao từ Marseille
        </p>
        <div className={styles.divider}>
          <span className={styles.line} />
          <Compass className={styles.icon} />
          <span className={styles.line} />
        </div>
      </div>
    </div>
  );
}

export default AdvanceHeading;
