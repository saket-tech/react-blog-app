// server/server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5001; // Port for the backend server

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON request bodies

// --- PostgreSQL Connection Setup ---
// TODO: Update with your PostgreSQL connection details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog_app',
  password: '7094', // Replace with your password
  port: 5432,
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
  console.log(`Backend server is running on http://localhost:${port}`);
});
