import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const LikePost = ({ blogId }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchLikesCount();
  }, []);

  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked_${blogId}`);
    if (likedStatus === 'true') {
      setLiked(true);
    }
  }, []);

  const fetchLikesCount = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch likes count');
      }
      const data = await response.json();
      setLikesCount(data.likes.length);
      setLiked(data.likes.includes(localStorage.getItem('userId')));
    } catch (error) {
      console.error('Error fetching likes count:', error);
    }
  };

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
        throw new Error('Failed to toggle like on the blog post');
      }

      const data = await response.json();
      const userId = localStorage.getItem('userId');

      if (data.likes.includes(userId)) {
        setLiked(true);
        setLikesCount(data.likes.length);
        localStorage.setItem(`liked_${blogId}`, 'true');
      } else {
        setLiked(false);
        setLikesCount(data.likes.length);
        localStorage.removeItem(`liked_${blogId}`);
      }
    } catch (error) {
      console.error('Error toggling like on the blog post:', error);
    }
  };

  return (
    <div>
      <Button variant="outline-primary" onClick={handleLike}>
        {liked ? `${likesCount - 1} others` : `Likes: ${likesCount}`}
      </Button>
    </div>
  );
};

export default LikePost;
