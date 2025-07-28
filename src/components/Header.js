// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav className="container nav">
        <Link to="/" className="nav-logo">
          My  Blog
        </Link>
        <Link to="/create" className="create-post-btn">
          Create Post
        </Link>
      </nav>
    </header>
  );
}

export default Header;