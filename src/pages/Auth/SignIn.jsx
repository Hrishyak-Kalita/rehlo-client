import React, { useState } from 'react';
import styles from './SignIn.module.scss'; // Import module.scss
import { useEffect } from 'react';
import {app } from '../../../firebaseConfig.js'
import { getAuth ,signInWithEmailAndPassword} from "firebase/auth";
import { useAuth } from '../../Context/auth.jsx';
import { useLocation } from 'react-router-dom';
import { useNavigate,Link } from 'react-router-dom';



const SignIn = () => {
//   const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const { login, isAuthenticated,setUser } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // Check if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  const handleSubmit= async (e)=>{
    e.preventDefault();

    if (!email || !password) {
      alert('All fields are required');
      return;
    }
    await signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        login(user?.accessToken)
        setUser(user?.email)
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
  }



  

  return (
    <div className={styles.signinContainer}>
      <div className={styles.leftSide}>
        <img
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Sign In Illustration"
          className={styles.leftImage}
        />
      </div>

      <div className={styles.rightSide}>
        <h2>Sign In</h2>
        <form className={styles.signinForm} onSubmit={handleSubmit}>
          {/* <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div> */}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password number"
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign In
          </button>
        </form>
        <p>Don't have an account? <Link to='/sign-up'>Sign Up</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
