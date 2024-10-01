import React, { useState } from 'react';
import styles from './Reviews.module.scss'; // Import your styles here

const Reviews = ({ name, rating, comment, date }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewRow}>

        <p className={styles.reviewerName}>{name}</p>


        <span className={styles.reviewRating}>★ {rating}</span>


        <p className={`${styles.reviewComment} ${isExpanded ? styles.expanded : ''}`}>
          {comment}
        </p>

        <p className={styles.reviewDate}>{date || 'N/A'}</p>
      </div>
    </div>
  );
};

export default Reviews;
