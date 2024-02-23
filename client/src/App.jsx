/*
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/screens/Home";
import SignIn from "./components/screens/SignIn";
import SignUp from "./components/screens/SignUp";
import Profile from "./components/screens/Profile";
import UserDashboard from "./components/screens/UserDashboard";
import { toast } from "react-toastify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(""); // Clear username on logout
    toast.success("Logged Out");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    localStorage.setItem("isLoggedIn", "false");
  };
  console.log("Username:", userName);

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
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route
            path="/signin"
            element={
              <SignIn setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />
            }
          />
          <Route
            path="/signup"
            element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
*/

// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/screens/Home";
import SignIn from "./components/screens/SignIn";
import SignUp from "./components/screens/SignUp";
import Profile from "./components/screens/Profile";
import UserDashboard from "./components/screens/UserDashboard";
import { toast } from "react-toastify";
import CreatPost from "./components/CreatePost";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    if (isLoggedIn) {
      const fetchUserInfo = async () => {
        try {
          const token = localStorage.getItem("token");
          const userInfoResponse = await fetch("/api/users/userinfo", {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userInfoData = await userInfoResponse.json();
          setUserName(userInfoData.username);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
      fetchUserInfo();
    } else {
      setUserName(""); // Clear username if user logs out
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.success("Logged Out");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    localStorage.setItem("isLoggedIn", "false");
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
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route
            path="/signin"
            element={
              <SignIn setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />
            }
          />
          <Route
            path="/signup"
            element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/create" element={<CreatPost />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
