import React from 'react';
import styles from './BookingForm.module.scss';
import { Link } from 'react-router-dom'; // Create a custom CSS/SCSS file for styling

const BookingForm = ({ hotelId, price }) => {
  // Hardcoded values
  // const price = 3200;
  const originalPrice = price;
  const discount = '20%';
  const taxes = 80;
  const couponCode = 'SAVE20';
  const savings = 800;
  const totalPrice = originalPrice-Math.ceil(20*originalPrice/100);
  const isLoggedIn = false;

  return (
    <div className={styles.priceContainer}>
      {/* Login Offer */}
      {!isLoggedIn && (
        <div className={styles.loginOffer}>
          <span>WELCOME20 coupon applied</span>
        </div>
      )}

      {/* Price Details */}
      <div className={styles.priceDetails}>
        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>₹{totalPrice}</span>
          <span className={styles.originalPrice}>₹{originalPrice}</span>
          <span className={styles.discount}>{discount} off</span>
        </div>
        <p className={styles.taxes}>+ taxes & fees: ₹{taxes}</p>
      </div>

      <div className={styles.couponSection}>
        <div className={styles.couponApplied}>
          <span>🎫 {couponCode} coupon applied</span>
          <span className={styles.savings}>- ₹{savings}</span>
        </div>
        <button className={styles.moreOffersButton}>MORE OFFERS</button>
      </div>

      {/* Savings and Total Price */}
      <div className={styles.summary}>
        <div className={styles.savingRow}>
          <span>Your savings</span>
          <span>₹{savings}</span>
        </div>
        <div className={styles.totalRow}>
          <span>Total price</span>
          <span>₹{totalPrice}</span>
          <p className={styles.taxesIncluded}>Including taxes & fees</p>
        </div>
      </div>

      <Link to={`/booking/form/${hotelId}`}>
        <button className={styles.continueButton}>Continue to Book</button>
      </Link>
    </div>
  );
};

export default BookingForm;
