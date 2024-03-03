import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';
import Carousel from 'react-bootstrap/Carousel';
import { Carouselimage } from '../Home/Carouselimage';
import { Link } from 'react-router-dom';
import LikePost from '../Posts/LikePost';
import CommentPost from '../Posts/CommentPost';

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/blogs/allBlogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const blogsData = await response.json();
      setBlogs(blogsData);
      console.log(blogsData);
    } catch (error) {
      toast.error('Error fetching blogs:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Carousel>
        <Carouselimage />
        <Carousel.Caption>
          <h1 style={{ color: 'black' }}>Welcome to your dashboard</h1>
          <p style={{ color: 'black' }}>
            Nulla vitae elit libero, a pharetra augue mollis interdum.
          </p>
        </Carousel.Caption>
      </Carousel>
      <Link to={'/create'}>
        <Button variant="primary">Create a Blog</Button>
      </Link>
      <Container fluid>
        <Row xs={1} md={2} lg={3} xl={3} className="g-4">
          {blogs.map((blog) => (
            <Col key={blog._id}>
              <Card style={{ width: '28rem' }} className="h-100">
                <Card.Img
                  variant="top"
                  src={
                    blog.image
                      ? blog.image
                      : 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg'
                  }
                />
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.content}</Card.Text>
                  <hr />
                  {blog.author && (
                    <Card.Text>Author: {blog.author.username}</Card.Text>
                  )}
                  {blog.createdAt && (
                    <Card.Text>Date: {formatDate(blog.createdAt)}</Card.Text>
                  )}
                  <hr />
                  <LikePost blogId={blog._id} />
                  <CommentPost blogId={blog._id} />
                  <Button variant="outline-primary">Read More</Button>
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
