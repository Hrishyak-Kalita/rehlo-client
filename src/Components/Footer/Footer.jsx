import React from 'react';
import styles from './Footer.module.scss'; // Ensure to create a corresponding SCSS file

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        

        <div className={styles.footerSection}>
          <h2 className={styles.footerTitle}>About Us</h2>
          <p className={styles.aboutText}>
            We provide the best hotel experience in top locations. From luxurious
            suites to cozy rooms, we ensure your stay is as comfortable as possible.
          </p>
        </div>


        <div className={styles.footerSection}>
          <h2 className={styles.footerTitle}>Quick Links</h2>
          <ul className={styles.footerLinks}>
            <li><a href="/about">About</a></li>
            <li><a href="/rooms">Rooms</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>


        <div className={styles.footerSection}>
          <h2 className={styles.footerTitle}>Contact Us</h2>
          <ul className={styles.contactInfo}>
            <li>Email: info@rehlo.com</li>
            <li>Phone: +91 31234567</li>
            <li>Location: 123 Hotel St., New York, NY</li>
          </ul>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} RehLo. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
