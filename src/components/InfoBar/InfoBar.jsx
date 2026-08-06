import React from 'react';
import { dataInfo } from './constants';
import InfoCard from './InfoCard/InfoCard';
import styles from './styles.module.scss';

function InfoBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {dataInfo.map((item, index) => {
          return (
            <InfoCard
              key={index}
              content={item.title}
              description={item.description}
              icon={item.icon}
              src={item.src}
            />
          );
        })}
      </div>
    </div>
  );
}

export default InfoBar;
