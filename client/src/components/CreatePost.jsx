import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { toast } from 'react-toastify';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState('');

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      try {
        setUploading(true);
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(selectedFile.name);
        await fileRef.put(selectedFile);
        const downloadURL = await fileRef.getDownloadURL();
        setImage(downloadURL);
        setUploading(false);
      } catch (error) {
        toast.error('Error uploading image:', error);
        setUploading(false);
        toast.error('Error uploading image');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        toast.error('Please upload an image.');
        return;
      }

      const response = await fetch('/api/blogs/newblog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, content, image }),
      });

      if (response.ok) {
        const savedBlog = await response.json();
        toast.success('Blog post created successfully', savedBlog);

        setTitle('');
        setContent('');
        setImage('');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error('Error creating blog post:', error);
      toast.error('An error occurred while creating the blog post.');
    }
  };

  return (
    <Card>
      <Card.Header as="h5">Create a New Blog</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={uploading}>
            {uploading ? 'Uploading image...' : 'Create Blog'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateBlog;
