// src/components/BlogCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ post, onDelete }) {
  return (
    <div className="blog-card">
      <div className="blog-card-content">
        <h2 className="blog-card-title">{post.title}</h2>
        <p className="blog-card-author">By: {post.author}</p>
        <p className="blog-card-excerpt">{post.content}</p>
        <div className="blog-card-actions">
          <Link to={`/posts/${post.id}`} className="card-link read-more">Read More</Link>
          <Link to={`/edit/${post.id}`} className="card-link edit">Edit</Link>
          <button onClick={() => onDelete(post.id)} className="card-button-delete">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
