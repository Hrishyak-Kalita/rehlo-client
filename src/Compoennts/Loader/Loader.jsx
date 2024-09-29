import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinnerSquare}>
        <div className={`${styles.square1} ${styles.square}`}></div>
        <div className={`${styles.square2} ${styles.square}`}></div>
        <div className={`${styles.square3} ${styles.square}`}></div>
      </div>
    </div>
  );
}

export default Loader;
