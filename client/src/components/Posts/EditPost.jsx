import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditPost = ({ selectedBlog, setSelectedBlog, setBlogs }) => {
  const [updatedTitle, setUpdatedTitle] = useState(selectedBlog.title);
  const [updatedContent, setUpdatedContent] = useState(selectedBlog.content);
  const [showEditModal, setShowEditModal] = useState(true);

  const handleClose = () => {
    setShowEditModal(false);
    setSelectedBlog(null);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`/api/blogs/${selectedBlog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: updatedTitle,
          content: updatedContent,
          image: selectedBlog.image, // Assuming you don't want to update the image
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to edit blog');
      }

      const updatedBlog = await response.json();
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        )
      );
      handleClose();
    } catch (error) {
      console.error('Error editing blog:', error);
    }
  };

  return (
    <Modal show={showEditModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Title:</label>
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <label>Content:</label>
        <textarea
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPost;
