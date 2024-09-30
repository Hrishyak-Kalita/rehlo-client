import React, { useState } from 'react';
import styles from './EditProfile.module.scss'; // Import the SCSS module
import { useEffect } from 'react';

const EditProfile = ({ profile, setIsEditing, setProfile }) => {
  const proxy = import.meta.env.VITE_PROXY
  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [address, setAddress] = useState(profile?.address || '');
  const [profilePicture, setProfilePicture] = useState(profile?.profilePicture || '');
  const [newProfile, setNewProfile] = useState(profile)
  //   const [role, setRole] = useState(profile.role || '');
  useEffect(() => {
    setNewProfile((prev) => ({
      ...prev,
      name: name,
      phone: phone,
      address: address,
      profilePicture: profilePicture,
    }))
  },[name,address,phone,profilePicture])
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(`${proxy}/auth/edit-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(newProfile)
      })

      const data = await response.json();
      if (!data) {
        console.log("error updating")
      } 


    } catch (err) {
      console.log(err)
    }

    setIsEditing(false)
  }

  return (
    <div className={styles.editFormContainer}>

<form className={styles.editForm} onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="profilePicture">Profile Picture URL:</label>
        <input
          type="url"
          id="profilePicture"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.saveBtn}>
        Save Changes
      </button>
    </form>

    </div>
    
  );
};

export default EditProfile;
