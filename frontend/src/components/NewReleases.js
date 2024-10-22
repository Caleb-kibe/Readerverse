import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewReleases.css';

const NewReleases = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes?q=new+releases&orderBy=newest&maxResults=10&key=YOUR_API_KEY'
        );
        setNewReleases(response.data.items || []);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch new releases');
        setLoading(false);
      }
    };

    fetchNewReleases();
  }, []);

  return (
    <div className="new-releases-container">
      <h2>New Releases</h2>
      {loading ? (
        <p>Loading new releases...</p>
      ) : error ? (
        <p>{error}</p>
      ) : newReleases.length > 0 ? (
        <ul className="new-releases-list">
          {newReleases.map((book, index) => (
            <li key={index} className="new-release-item">
              <h3>{book.volumeInfo.title}</h3>
              <p>by {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No new releases found</p>
      )}
    </div>
  );
};

export default NewReleases;
