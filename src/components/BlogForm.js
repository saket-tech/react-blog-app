// src/components/BlogForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BlogForm({ onSubmit, initialData = {}, isEditMode = false }) {
  // Initialize state directly from props. This runs only on the first render,
  // preventing the form from resetting on parent component re-renders.
  const [title, setTitle] = useState(initialData.title || '');
  const [author, setAuthor] = useState(initialData.author || '');
  const [content, setContent] = useState(initialData.content || '');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !content) {
      alert("Please fill out all fields.");
      return;
    }
    onSubmit({ title, author, content });
    navigate('/');
  };

  return (
    <div className="form-container">
      <h1 className="page-title">{isEditMode ? 'Edit Post' : 'Create New Post'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            className="form-textarea"
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="form-submit-btn">
            {isEditMode ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
