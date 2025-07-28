// src/pages/CreatePostPage.js
import React from 'react';
import BlogForm from '../components/BlogForm';

function CreatePostPage({ onAdd }) {
  return <BlogForm onSubmit={onAdd} isEditMode={false} />;
}

export default CreatePostPage;