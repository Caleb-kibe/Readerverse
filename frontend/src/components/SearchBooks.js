import React, { useState } from 'react';
import axios from 'axios';
import './SearchBooks.css';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  // Function to fetch books from the public API
  const searchBooks = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      setBooks(response.data.items || []); // Ensure it's an array
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Function to handle downloading the book
  const downloadBookFromAPI = async (bookId) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
      const bookInfo = response.data;

      // Check if there's a download link available
      if (bookInfo.accessInfo && bookInfo.accessInfo.pdf && bookInfo.accessInfo.pdf.downloadLink) {
        const downloadLink = bookInfo.accessInfo.pdf.downloadLink;
        
        // Open the download link in a new tab
        window.open(downloadLink, '_blank');
      } else {
        console.log('No download link available for this book.');
      }
    } catch (error) {
      console.error('Error fetching book download link:', error);
    }
  };

  return (
    <div className="search-container">
      <h1>Search for Books</h1>
      <form onSubmit={searchBooks}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books"
        />
        <button type="submit">Search</button>
      </form>

      {/* Render book search results */}
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id}>
              <h2>{book.volumeInfo.title}</h2>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              <button onClick={() => downloadBookFromAPI(book.id)}>Download</button>
            </div>
          ))
        ) : (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
