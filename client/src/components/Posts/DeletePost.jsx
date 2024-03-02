// DeletePost.jsx
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeletePost = ({ selectedBlog, setShowDeleteModal, setBlogs }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/blogs/${selectedBlog._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== selectedBlog._id)
      );

      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <Modal show={true} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this blog?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePost;
