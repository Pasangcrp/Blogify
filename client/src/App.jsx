import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NavBar from './components/Navigation/NavBar';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import SignIn from './components/Register/SignIn';
import SignUp from './components/Register/SignUp';
import Profile from './components/User/Profile';
import UserDashboard from './components/User/UserDashboard';
import { toast } from 'react-toastify';
import CreatPost from './components/Posts/CreatePost';

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [userName, setUserName] = useState(
    localStorage.getItem('username') || ''
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    setIsLoggedIn(false);
    toast.success('Logged Out');
    navigate(`/`);
  };

  return (
    <>
      <NavBar
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        username={userName}
      />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/UserDashboard" />
              ) : (
                <SignIn
                  setIsLoggedIn={setIsLoggedIn}
                  setUserName={setUserName}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/UserDashboard" />
              ) : (
                <SignUp setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route path="/create" element={<CreatPost />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
