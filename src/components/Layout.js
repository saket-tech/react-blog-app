// src/components/Layout.js
import React from 'react';
import Header from './Header';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="container main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;