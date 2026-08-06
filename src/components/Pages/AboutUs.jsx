import React from 'react';
import { useStore } from '@context/StoreContext';
import { Sparkles, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import styles from './styles.module.scss';

function AboutUs() {
  const { t } = useStore();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.aboutHeader}>
        <span className={styles.journeyTag}>
          <Sparkles style={{ width: 14, height: 14 }} />
          Hành Trình Marseille04
        </span>
        <h1 className={styles.aboutTitle}>
          XStore Marseille04 - Tinh Hoa Phong Cách Pháp
        </h1>
        <p className={styles.aboutDesc}>
          Được thành lập từ nguồn cảm hứng bất tận của thành phố cảng Marseille cổ kính, XStore Marseille04 mang đến những không gian sống đỉnh cao với sự kết hợp hài hòa giữa kiến trúc Bắc Âu tối giản và nét quyến rũ vượt thời gian của nước Pháp.
        </p>
      </div>

      <div className={styles.aboutGrid}>
        <div className={styles.aboutCard}>
          <div className={styles.iconBox}>
            <Award style={{ width: 28, height: 28 }} />
          </div>
          <h3 className={styles.cardTitle}>
            Chất Lượng Châu Âu
          </h3>
          <p className={styles.cardDesc}>
            100% sản phẩm được tuyển chọn kỹ lưỡng từ các nghệ nhân chế tác thủ công hàng đầu châu Âu.
          </p>
        </div>

        <div className={styles.aboutCard}>
          <div className={styles.iconBox}>
            <ShieldCheck style={{ width: 28, height: 28 }} />
          </div>
          <h3 className={styles.cardTitle}>
            Bảo Hành Độc Quyền
          </h3>
          <p className={styles.cardDesc}>
            Cam kết bảo hành chính hãng 24 tháng cùng chính sách 1 đổi 1 trong 14 ngày mua sắm.
          </p>
        </div>

        <div className={styles.aboutCard}>
          <div className={styles.iconBox}>
            <HeartHandshake style={{ width: 28, height: 28 }} />
          </div>
          <h3 className={styles.cardTitle}>
            Tư Vấn Tận Tâm
          </h3>
          <p className={styles.cardDesc}>
            Đội ngũ chuyên gia thiết kế kiến trúc luôn sẵn sàng hỗ trợ bạn kiến tạo không gian sống mơ ước.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
