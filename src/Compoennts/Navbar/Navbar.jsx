import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import { useAuth } from '../../Context/auth';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated} = useAuth()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <a href="/">RehLo</a>
      </div>
      <div className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
        <ul>
          <li><a href="/shots">Shots</a></li>
          <li><a href="/designers">Designers</a></li>
          <li><a href="/jobs">Jobs</a></li>
          <li><a href="/events">Events</a></li>
          <li className={styles.dropdown} onClick={toggleDropdown}>
            <span>Learn</span>
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><a href="/tutorials">Tutorials</a></li>
                <li><a href="/webinars">Webinars</a></li>
                <li><a href="/workshops">Workshops</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {
        isAuthenticated ? <div className={styles.actions}>
          <Link to='/user/profile'><CgProfile size={30} color='#FA6800'/></Link>
        </div> :
          <div className={styles.actions}>
            <a href="/sign-in" className={styles.signup}>Sign In</a>
          </div>

      }
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </nav>
  );
};

export default Navbar;
