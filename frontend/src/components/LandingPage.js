import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { useEffect, useState } from 'react';
// import BookSearch from './BookSearch';

const LandingPage = () => {
  const [books, setBooks] = useState([]);

  // Fetch book data from a public API
  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=javascript')
    // fetch('https://www.googleapis.com/books/v1/volumes?q={title}')
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          setBooks(data.items.slice(0, 6));  // Only slice if items exist
        } else {
          setBooks([]);  // Set to empty array if no books found
        }
      })
      .catch(error => console.error("Error fetching books:", error));
  }, []);  

  return (
    <div className="LandingPage">
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
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      {/* <section className="hero">
        <div className="container">
          <h2>Discover and Explore Books</h2>
          <div className="search-books">
            <BookSearch />
          </div>
        </div>
      </section> */}
      {/* Featured Section */}
      <section className="featured-section">
        <div className="container">
          <h2>Explore Popular Books</h2>
          <div className="book-grid">
            {books.length > 0 ? (
              books.map(book => (
                <div key={book.id} className="book-card">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                    alt={book.volumeInfo.title}
                    className="book-image"
                  />
                  <div className="book-info">
                    <h3>{book.volumeInfo.title}</h3>
                    <p>{book.volumeInfo.subtitle || 'No description available'}</p>
                    <Link to={`/books/${book.id}`} className="btn">Read More</Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading books...</p>
            )}

            {/* {books.length > 0 ? (
              books.map(book => (
                <div key={book.bib_key} className="book-card">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                    alt={book.volumeInfo.title}
                    className="book-image"
                  />
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p>{book.volumeInfo.subtitle || 'No description available'}</p>
                    <Link to={`/books/${book.id}`} className="btn">Read More</Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading books...</p>
            )} */}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="container">
          <h2>Featured Categories</h2>
          <div className="card-grid">
            <Link to="/new-releases" className="card">
              <div className="card-image new-releases"></div>
              <div className="card-content">
                <h3>New Releases</h3>
              </div>
            </Link>
            <Link to="/genres" className="card">
              <div className="card-image genres"></div>
              <div className="card-content">
                <h3>Genres</h3>
              </div>
            </Link>
            <Link to="/authors" className="card">
              <div className="card-image authors"></div>
              <div className="card-content">
                <h3>Authors</h3>
              </div>
            </Link>
            <Link to="/languages" className="card">
              <div className="card-image languages"></div>
              <div className="card-content">
                <h3>Languages</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Users Are Saying</h2>
          <div className="testimonial">
            <p>"Readerverse helped me discover so many amazing books I wouldn't have found otherwise!"</p>
            <p>— Sarah, Book Enthusiast</p>
          </div>
          <div className="testimonial">
            <p>"The search functionality is seamless and I love the genre recommendations."</p>
            <p>— John, Avid Reader</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 Readerverse. All rights reserved.</p>
          <div className="social-links">
            <Link to="/facebook">Facebook</Link>
            <Link to="/twitter">Twitter</Link>
            <Link to="/instagram">Instagram</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
