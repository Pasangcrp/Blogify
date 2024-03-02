import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignIn = ({ setIsLoggedIn, setUserName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const postData = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/users/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error('Enter correct email or password');
        return;
      }

      const { token } = await response.json(); // Extract token from response

      // Store token in local storage
      localStorage.setItem('token', token);

      // Fetch user information after successful login
      const userInfoResponse = await fetch('/api/users/userinfo', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      const userInfoData = await userInfoResponse.json();
      console.log('User Info:', userInfoData); // Add console log here to check user info

      // Update the username state
      setUserName(userInfoData.username);
      console.log(userInfoData.username);

      setEmail('');
      setPassword('');

      toast.success('LogIn successful!');
      setIsLoggedIn(true);

      // setTimeout(() => {
      //   window.location.href = "/UserDashboard";
      // }, 1000);
      navigate('/UserDashboard');
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    }
  };

  /*
  const postData = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/users/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error("Enter correct email or password");
        return;
      }

      const { token } = await response.json();

      localStorage.setItem("token", token);

      setEmail("");
      setPassword("");

      toast.success("LogIn successful!");
      setIsLoggedIn(true);

      setTimeout(() => {
        window.location.href = "/UserDashboard";
      }, 1000);
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };
*/
  return (
    <>
      <div className="auth-card">
        <Card className="card">
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>Blogify</Card.Title>
            <Card.Text style={{ textAlign: 'center' }}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Form onSubmit={postData} action="postData">
              <Form.Group className="mb-3" controlId="formBasicUsernameOrEmail">
                <Form.Label className="text-start">Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="text-start">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                className="mx-auto d-block"
                variant="primary"
                type="submit"
              >
                Sign In
              </Button>
            </Form>
            <p className="text-center">
              <Link
                to="/SignUp"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                Don't have an account? Signup here!
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SignIn;
