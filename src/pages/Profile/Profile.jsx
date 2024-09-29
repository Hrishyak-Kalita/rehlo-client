import React from 'react';
import styles from './Profile.module.scss'; // Import the SCSS module
import { useAuth } from '../../Context/auth'; // Assume user data is available in Auth context

const Profile = () => {
   const { logout } = useAuth();
const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    profilePicture: 'https://via.placeholder.com/150',
    role: 'Admin',
    createdAt: '2023-01-01',
    lastLogin: '2023-09-29',
  }; // Fetch authenticated user details

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <img
            src={user?.profilePicture || 'https://via.placeholder.com/150'}
            alt={`${user?.name}'s profile`}
            className={styles.profileImage}
          />
          <h2>{user?.name}</h2>
          <p className={styles.userRole}>Role: {user?.role || 'User'}</p>
        </div>
        
        <div className={styles.profileDetails}>
          <h3>Personal Information</h3>
          <ul>
            <li>
              <strong>Email:</strong> {user?.email || 'Not available'}
            </li>
            <li>
              <strong>Phone:</strong> {user?.phone || 'Not available'}
            </li>
            <li>
              <strong>Address:</strong> {user?.address || 'Not available'}
            </li>
          </ul>
        </div>

        <div className={styles.accountDetails}>
          <h3>Account Information</h3>
          <ul>
            <li>
              <strong>Account Created:</strong> {user?.createdAt || 'Not available'}
            </li>
            <li>
              <strong>Last Login:</strong> {user?.lastLogin || 'Not available'}
            </li>
          </ul>
        </div>

        <div className={styles.actions}>
          <button className={styles.editBtn}>Edit Profile</button>
          <button className={styles.logoutBtn} onClick={()=>logout()}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
