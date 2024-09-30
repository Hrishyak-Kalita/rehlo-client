import React from 'react';
import styles from './Reviews.module.scss'; // Import your styles here

const Reviews = ({ name, rating, comment }) => {
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewHeader}>
        <p className={styles.reviewerName}>{name}</p>
        <span className={styles.reviewRating}>★ {rating}</span>
      </div>
      <p className={styles.reviewComment}>{comment}</p>
    </div>
  );
};


export default Reviews;
