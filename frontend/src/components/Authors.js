import React, { useEffect, useState } from 'react';
import './Authors.css';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch authors from Open Library and Google Books API
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const openLibraryResponse = await fetch('https://openlibrary.org/authors/OL1A.json');
        const googleBooksResponse = await fetch('https://www.googleapis.com/books/v1/volumes?q=inauthor:tolkien&key=YOUR_GOOGLE_BOOKS_API_KEY');

        const openLibraryData = await openLibraryResponse.json();
        const googleBooksData = await googleBooksResponse.json();

        // Extract relevant author data
        const openLibraryAuthors = [openLibraryData.personal_name]; // Example from Open Library's specific author endpoint
        const googleBooksAuthors = googleBooksData.items.map(item => item.volumeInfo.authors).flat();

        // Combine the author lists and remove duplicates
        const combinedAuthors = Array.from(new Set([...openLibraryAuthors, ...googleBooksAuthors]));
        setAuthors(combinedAuthors);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch authors');
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className="authors-container">
      <h2>Authors</h2>
      {loading ? (
        <p>Loading authors...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="authors-list">
          {authors.map((author, index) => (
            <li key={index} className="author-item">{author}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Authors;
