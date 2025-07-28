// src/pages/HomePage.js
import React from 'react';
import BlogCard from '../components/BlogCard';

function HomePage({ posts, onDelete }) {
  return (
    <div>
      <h1 className="page-title">All Posts</h1>
      {posts.length > 0 ? (
        <div className="posts-grid">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p style={{ fontSize: '1.5rem', color: '#64748b' }}>No posts yet. Create one!</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
