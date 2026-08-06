import React from 'react';
import styles from './styles.module.scss';

function InfoCard({ content, description, icon: Icon, src }) {
  return (
    <div className={styles.containerCard}>
      <div className={styles.iconBox}>
        {Icon ? <Icon size={26} /> : <img src={src} alt={content} className={styles.imgIcon} />}
      </div>
      <div className={styles.containerContent}>
        <div className={styles.title}>{content}</div>
        <div className={styles.des}>{description}</div>
      </div>
    </div>
  );
}

export default InfoCard;
