import { useState } from 'react';
import { AuthProvider } from './Context/auth';
import { Home, Private, Profile, RoomDetails, SignIn, SignUp } from './pages';
import { Footer, Navbar } from './Compoennts'; // Corrected spelling: 'Components'
import { Routes, Route } from 'react-router-dom'; // Consolidated imports from 'react-router-dom'


function App() {

  

  return (
    <div>
      <AuthProvider>
        <Navbar />

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property/:id" element={<RoomDetails />} />
            <Route path="/sign-in" element={<SignIn />} /> 
            <Route path="/sign-up" element={<SignUp />} />

            <Route path="/user" element={<Private/>}>
              <Route path="profile" element={<Profile/>} /> 
            </Route>
          </Routes>
        </div>

        <div>
          <Footer />
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
