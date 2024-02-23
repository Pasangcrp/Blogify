import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const SignUp = ({ setIsLoggedIn }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = async (event) => {
    event.preventDefault();

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email address");
      }
      if (!strongPasswordRegex.test(password)) {
        throw new Error(
          "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters."
        );
      }
      const response = await fetch(`/api/users/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      setName("");
      setUsername("");
      setEmail("");
      setPassword("");

      toast.success("Registration successful!");
      setIsLoggedIn(true);

      setTimeout(() => {
        window.location.href = "/SignIn";
      }, 1000);
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="auth-card">
        <Card className="card">
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>Blogify</Card.Title>
            <Card.Text style={{ textAlign: "center" }}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Form onSubmit={postData}>
              <Form.Group className="mb-3" controlId="formBasicFullName">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Button
                type="submit"
                className="mx-auto d-block"
                variant="primary"
                onClick={postData}
              >
                Sign Up
              </Button>
            </Form>
            <p className="text-center">
              <Link
                to="/SignIn"
                style={{ textDecoration: "none", color: "black" }}
              >
                Already have an account? Login here!
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
