// server/server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
// Use the port provided by Render, or 5001 for local development
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// --- PostgreSQL Connection Setup ---
// The DATABASE_URL environment variable is provided by Render.
// It includes the username, password, host, and database name.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Add SSL configuration for connecting to Render's database
  ssl: {
    rejectUnauthorized: false
  }
});

// --- API Routes ---

// GET all posts
app.get('/api/posts', async (req, res) => {
  try {
    const allPosts = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET a single post
app.get('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (post.rows.length === 0) {
      return res.status(404).json('Post not found');
    }
    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// CREATE a new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const newPost = await pool.query(
      'INSERT INTO posts (title, author, content) VALUES ($1, $2, $3) RETURNING *',
      [title, author, content]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// UPDATE a post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, content } = req.body;
    const updatePost = await pool.query(
      'UPDATE posts SET title = $1, author = $2, content = $3 WHERE id = $4 RETURNING *',
      [title, author, content, id]
    );
    if (updatePost.rows.length === 0) {
      return res.status(404).json('Post not found');
    }
    res.json(updatePost.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE a post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    if (deletePost.rows.length === 0) {
        return res.status(404).json('Post not found');
    }
    res.json({ message: 'Post was deleted!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
