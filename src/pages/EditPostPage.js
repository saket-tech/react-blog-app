// src/pages/EditPostPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import BlogForm from '../components/BlogForm';

function EditPostPage({ posts, onUpdate }) {
  const { id } = useParams();
  // PostgreSQL IDs are numbers, so we parse the param
  const postId = parseInt(id, 10);
  const postToEdit = posts.find(p => p.id === postId);

  const handleUpdate = (postData) => {
    onUpdate(postId, postData);
  };

  return (
    <BlogForm 
      onSubmit={handleUpdate} 
      initialData={postToEdit}
      isEditMode={true} 
    />
  );
}

export default EditPostPage;