import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';  // Linking to the new CSS file

const Layout = () => {
  return (
    <div className="LayoutPage">
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <h1>Readerverse</h1>
          <nav className="nav">
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/new-releases">New Releases</Link></li>
              <li><Link to="/genres">Genres</Link></li>
              <li><Link to="/authors">Authors</Link></li>
              <li><Link to="/languages">Languages</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 Readerverse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
