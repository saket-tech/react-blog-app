// src/pages/PostDetailPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

function PostDetailPage({ posts }) {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id, 10));

  if (!post) {
    return <h1 className="page-title" style={{color: '#f87171'}}>Post not found!</h1>;
  }

  return (
    <div className="post-detail-container">
      <h1 className="post-detail-title">{post.title}</h1>
      <p className="post-detail-author">By: {post.author}</p>
      <div className="post-detail-content">
        {post.content}
      </div>
      <Link to="/" className="post-detail-back-link">← Back to all posts</Link>
    </div>
  );
}

export default PostDetailPage;
