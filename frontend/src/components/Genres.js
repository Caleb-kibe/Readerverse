import React, { useEffect, useState } from 'react';
import './Genres.css';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch genres from Open Library and Google Books API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const openLibraryResponse = await fetch('https://openlibrary.org/subjects.json');
        const googleBooksResponse = await fetch('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&key=YOUR_GOOGLE_BOOKS_API_KEY');

        const openLibraryData = await openLibraryResponse.json();
        const googleBooksData = await googleBooksResponse.json();

        // Extract relevant data
        const openLibraryGenres = openLibraryData.subjects.map((subject) => subject.name);
        const googleBooksGenres = googleBooksData.items.map((item) => item.volumeInfo.categories).flat();

        // Combine the genre lists and remove duplicates
        const combinedGenres = Array.from(new Set([...openLibraryGenres, ...googleBooksGenres]));
        setGenres(combinedGenres);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch genres');
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="genres-container">
      <h2>Genres</h2>
      {loading ? (
        <p>Loading genres...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="genres-list">
          {genres.map((genre, index) => (
            <li key={index} className="genre-item">{genre}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Genres;
