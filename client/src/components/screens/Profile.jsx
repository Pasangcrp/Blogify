import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Profile = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const token = localStorage.getItem("token");

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
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const fetchBlogs = async (userId) => {
    try {
      const response = await fetch(`/api/blogs/blogsByAuthor/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`/api/blogs/${selectedBlog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to edit blog");
      }

      const updatedBlog = await response.json();
      const updatedBlogs = blogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      );
      setBlogs(updatedBlogs);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error editing blog:", error);
    }
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
                  <button className="btn btn-outline-primary">Share</button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Title:</label>
          <input
            type="text"
            value={selectedBlog?.title}
            onChange={(e) =>
              setSelectedBlog({ ...selectedBlog, title: e.target.value })
            }
          />
          <label>Content:</label>
          <textarea
            value={selectedBlog?.content}
            onChange={(e) =>
              setSelectedBlog({ ...selectedBlog, content: e.target.value })
            }
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
