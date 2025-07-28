// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import PostDetailPage from './pages/PostDetailPage';
import './styles/App.css';

// Change this line in src/App.js
// TODO: Replace with your LIVE backend URL from Render
const API_URL = 'https://blog-backend-tfip.onrender.com';/ Replace with your live backend URL // URL of our backend server

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleAddPost = async (postData) => {
    try {
      await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      getPosts(); // Re-fetch posts to update the UI
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  const handleUpdatePost = async (id, updatedData) => {
    try {
      await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      getPosts(); // Re-fetch posts to update the UI
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await fetch(`${API_URL}/posts/${id}`, {
          method: 'DELETE',
        });
        getPosts(); // Re-fetch posts to update the UI
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  return (
    <Layout>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage posts={posts} onDelete={handleDeletePost} loading={loading} />} 
        />
        <Route 
          path="/create" 
          element={<CreatePostPage onAdd={handleAddPost} />} 
        />
        <Route 
          path="/edit/:id" 
          element={<EditPostPage posts={posts} onUpdate={handleUpdatePost} />} 
        />
        <Route 
          path="/posts/:id" 
          element={<PostDetailPage posts={posts} />} 
        />
      </Routes>
    </Layout>
  );
}

export default App;

