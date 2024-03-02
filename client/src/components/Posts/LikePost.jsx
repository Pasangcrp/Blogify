// LikePost.jsx
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const LikePost = ({ blogId }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to like the blog post');
      }

      // Update liked state and likesCount state accordingly
      setLiked(true);
      setLikesCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error liking the blog post:', error);
    }
  };

  return (
    <Button variant="link" onClick={handleLike}>
      {liked ? `Liked by You and ${likesCount - 1} others` : 'Like'}
    </Button>
  );
};

export default LikePost;
