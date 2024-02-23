/*
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/blogs/allBlogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const blogsData = await response.json();
      setBlogs(blogsData);
    } catch (error) {
      toast.error("Error fetching blogs:", error);
    }
  };

  return (
    <>
      <h1 className="text-center p-4 mt-1">Welcome to your dashboard</h1>

      <Container fluid>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {blogs.map((blog) => (
            <Col key={blog._id}>
              <Card style={{ width: "18rem" }} className="h-100">
                <Card.Img variant="top" src={blog.imageURL} />
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.content}</Card.Text>
                  <Button variant="primary">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default UserDashboard;
*/
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Carousel from "react-bootstrap/Carousel";
import { Carouselimage } from "../Carouselimage";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/blogs/allBlogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const blogsData = await response.json();
      setBlogs(blogsData);
    } catch (error) {
      toast.error("Error fetching blogs:", error);
    }
  };

  return (
    <>
      <Carousel>
        <Carouselimage />
        <Carousel.Caption>
          <h1 style={{ color: "black" }}>Welcome to your dashboard</h1>
          <p style={{ color: "black" }}>
            Nulla vitae elit libero, a pharetra augue mollis interdum.
          </p>
        </Carousel.Caption>
      </Carousel>
      <Link to={"/create"}>
        <Button variant="primary">Create a Blog</Button>
      </Link>

      <Container fluid>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {blogs.map((blog) => (
            <Col key={blog._id}>
              <Card style={{ width: "18rem" }} className="h-100">
                <Card.Img variant="top" src={blog.imageURL} />
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>

                  <Card.Text>{blog.content}</Card.Text>
                  <hr />
                  {blog.author && (
                    <Card.Text>Author: {blog.author.username}</Card.Text>
                  )}
                  <hr />
                  <Button variant="primary">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default UserDashboard;
