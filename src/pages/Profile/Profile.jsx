  import React from 'react';
  import styles from './Profile.module.scss'; // Import the SCSS module
  import { useAuth } from '../../Context/auth'; // Assume user data is available in Auth context
  import { useEffect } from 'react';
  import { useState } from 'react';
  import Loader from '../../Components/Loader/Loader'
  import EditProfile from './EditProfile';
  const Profile = () => {
    const { logout } = useAuth();
    const [profile,setProfile]=useState()
    const [isEditing, setIsEditing]=useState(false);
    const proxy=import.meta.env.VITE_PROXY


    useEffect(()=>{
        fetchProfile() 
    },[isEditing])

    const fetchProfile=async()=>{
      try{

        const response= await fetch(`${proxy}/auth/user-details`,{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`
          }
        })

        const data=await response.json();

        if(data?.profile){

          setProfile(data?.profile)
        }

      }catch(err){
        console.log(err)
      }
    }

    if(!profile){
      return (<Loader/>)
    }

    if (isEditing) {
      return (
        <EditProfile 
          profile={profile} 
          setIsEditing={setIsEditing}  // Pass this prop
          setProfile={setProfile}      // Ensure this prop is passed
        />
      );
    }



    return (
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <img
              src={profile?.profilePicture || 'https://via.placeholder.com/150'}
              alt={`${profile?.name}'s profile`}
              className={styles.profileImage}
            />
            <h2>{profile?.name}</h2>
            <p className={styles.userRole}>{profile?.email || 'User'}</p>
          </div>
          
          <div className={styles.profileDetails}>
            <h3>Personal Information</h3>
            <ul>
              <li>
                <strong>Email:</strong> {profile?.email || 'Not available'}
              </li>
              <li>
                <strong>Phone:</strong> {profile?.phone || 'Not available'}
              </li>
              <li>
                <strong>Address:</strong> {profile?.address || 'Not available'}
              </li>
            </ul>
          </div>

          <div className={styles.accountDetails}>
            <h3>Account Information</h3>
            <ul>
              <li>
                <strong>Account Created:</strong> {profile?.createdAt || 'Not available'}
              </li>
              <li>
                <strong>Last Login:</strong> {profile?.lastLogin || 'Not available'}
              </li>
            </ul>
          </div>

          <div className={styles.actions}>
            <button className={styles.editBtn} onClick={()=>setIsEditing(true)}>Edit Profile</button>
            <button className={styles.logoutBtn} onClick={()=>logout()}>Logout</button>
          </div>
        </div>
      </div>
    );
  };

  export default Profile;
