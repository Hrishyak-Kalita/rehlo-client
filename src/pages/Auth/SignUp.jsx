import React, { useState } from 'react';
import styles from './SignIn.module.scss'; // Import module.scss
import { useEffect } from 'react';
import { app } from '../../../firebaseConfig.js'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../../Context/auth.jsx';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const auth = getAuth(app);
  const { login, isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const proxy = import.meta.env.VITE_PROXY

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('All fields are required');
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        login(user?.accessToken)
        createNewUserInDb()
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

  const createNewUserInDb = async () => {
    try {
      const response = await fetch(`${proxy}/auth/add-new-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          name, email, phone
        })
      })

      const data = await response.json()
      if (!data) console.log("Error creating new user")
      else console.log(data)

    } catch (err) {
      console.log(err)
    }
  }





  return (
    <div className={styles.signinContainer}>
      <div className={styles.leftSide}>
        <img
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Sign In Illustration"
          className={styles.leftImage}
        />
      </div>

      <div className={styles.rightSide}>
        <h2>Sign Up</h2>
        <form className={styles.signinForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone"
              required
            />
          </div>

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
            Sign Up
          </button>
        </form>
        <p>already have and account?
          <Link to='/sign-in'>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
