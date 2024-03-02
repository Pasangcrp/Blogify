import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import EditPost from '../Posts/EditPost';
import DeletePost from '../Posts/DeletePost'; // Import DeletePost component

const Profile = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Add state for delete modal

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.id) {
        const userId = decodedToken.id;
        fetchBlogs(userId);
      }
    }
  }, [token]);

  const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const fetchBlogs = async (userId) => {
    try {
      const response = await fetch(`/api/blogs/blogsByAuthor/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setShowEditModal(true);
    setShowDeleteModal(false); // Close delete modal when edit modal is opened
  };

  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
    setShowEditModal(false); // Close edit modal when delete modal is opened
  };

  return (
    <>
      <h1 className="text-center p-4 mt-1">My Blogs</h1>
      <Row xs={1} md={2} className="g-4">
        {blogs.map((blog) => (
          <Col key={blog._id}>
            <Card>
              <Card.Img variant="top" src={blog.image[0]} />
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.content}</Card.Text>
                <Card.Text>Date: {formatDate(blog.createdAt)}</Card.Text>
                <hr />
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleEditClick(blog)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-outline-primary">Likes</button>
                  <button className="btn btn-outline-primary">Comments</button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleDeleteClick(blog)}
                  >
                    Delete
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Render EditPost and DeletePost modals */}
      {selectedBlog && (
        <>
          {showEditModal && (
            <EditPost
              selectedBlog={selectedBlog}
              setShowEditModal={setShowEditModal}
              setBlogs={setBlogs}
            />
          )}
          {showDeleteModal && (
            <DeletePost
              selectedBlog={selectedBlog}
              setShowDeleteModal={setShowDeleteModal}
              setBlogs={setBlogs}
            />
          )}
        </>
      )}
    </>
  );
};

export default Profile;
