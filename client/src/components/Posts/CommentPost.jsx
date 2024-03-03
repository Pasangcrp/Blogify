import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const CommentPost = ({ blogId }) => {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false); // State to control the visibility of the comment input
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleComment = async () => {
    if (!isLoggedIn) {
      setError('Please log in to comment.');
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${blogId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ text: commentText }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      setCommentText('');
      setError('');
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment. Please try again later.');
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        showCommentInput ? (
          <>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment here..."
            />
            <Button variant="primary" onClick={handleComment}>
              Post Comment
            </Button>
            {error && <div>{error}</div>}
          </>
        ) : (
          // Otherwise, render the comment button
          <Button
            variant="outline-primary"
            onClick={() => setShowCommentInput(true)}
          >
            Comment
          </Button>
        )
      ) : (
        <div>Please log in to comment.</div>
      )}
    </div>
  );
};

export default CommentPost;
