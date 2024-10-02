import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss'; 
import { useAuth } from '../../Context/auth'; 
import Loader from '../../Components/Loader/Loader';
import EditProfile from './EditProfile';

const Profile = () => {
  const { logout } = useAuth();  // For logging out the user
  const [profile, setProfile] = useState();  // State to hold the profile data
  const [isEditing, setIsEditing] = useState(false);  // Toggle between view and edit modes
  const proxy = import.meta.env.VITE_PROXY;  // Proxy for API requests

  // Fetch the profile data when the component mounts or when edit mode toggles
  useEffect(() => {
    fetchProfile();
  }, [isEditing]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${proxy}/auth/user-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('authToken')}`  // Pass auth token for API authentication
        }
      });

      const data = await response.json();  // Convert the response to JSON
      if (data?.profile) {
        setProfile(data?.profile);  // Set profile data if available
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Loader while profile data is being fetched
  if (!profile) {
    return <Loader />;
  }

  // Render the profile edit component if editing mode is active
  if (isEditing) {
    return (
      <EditProfile 
        profile={profile} 
        setIsEditing={setIsEditing}  
        setProfile={setProfile}  // Pass current profile state and setters to edit form
      />
    );
  }

  return (
    <div className={styles.profileContainer}>
      {/* Cover Photo */}
      <div className={styles.coverPhoto}>
        <img src="https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=2559&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>

      {/* Profile Card */}
      <div className={styles.profileCard}>
        <img
          src={profile?.profilePicture || 'https://via.placeholder.com/150'}  // Default profile picture if not available
          alt={`${profile?.name}'s profile`}
          className={styles.profileImage}
        />
        <h2>{profile?.name}</h2>
        <p className={styles.userRole}>{profile?.email || 'User'}</p>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button className={styles.logoutBtn} onClick={() => logout()}>Logout</button>
        </div>
      </div>

      {/* Profile Information Sections */}
      <div className={styles.profileSections}>
        {/* Personal Info Section */}
        <div className={styles.sectionCard}>
          <h3>Personal Information</h3>
          <ul>
            <li><strong>Email:</strong> {profile?.email || 'Not available'}</li>
            <li><strong>Phone:</strong> {profile?.phone || 'Not available'}</li>
            <li><strong>Address:</strong> {profile?.address || 'Not available'}</li>
          </ul>
        </div>

        {/* Account Info Section */}
        <div className={styles.sectionCard}>
          <h3>Account Information</h3>
          <ul>
            <li><strong>Account Created:</strong> {new Date(profile?.createdAt).toLocaleDateString() || 'Not available'}</li>
            <li><strong>Last Login:</strong> {new Date(profile?.lastLogin).toLocaleString() || 'Not available'}</li>
          </ul>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className={styles.recentActivity}>
        <h3>Recent Activity</h3>
        <ul className={styles.activityList}>
          <li>Last Login: {new Date(profile?.lastLogin).toLocaleString() || 'Not available'}</li>
          {/* Additional activities can be added here */}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
