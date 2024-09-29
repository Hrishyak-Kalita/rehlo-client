import React from 'react';
import styles from './Card.module.scss';

const CardComp = ({ image, title, location, price, rating }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardLocation}>{location}</p>
        <div className={styles.cardDetails}>
          <span className={styles.cardPrice}>₹{price}</span>
          <span className={styles.cardRating}>{rating} ★</span>
        </div>
      </div>
    </div>
  );
};

export default CardComp;
