import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Languages.css';

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [books, setBooks] = useState([]);

  // Fetch languages from REST Countries API
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        // Extract languages from the data and filter unique languages
        const extractedLanguages = new Set();
        data.forEach(country => {
          Object.values(country.languages || {}).forEach(language => extractedLanguages.add(language));
        });

        setLanguages(Array.from(extractedLanguages));
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch languages');
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  // Fetch books when a language is selected
  const fetchBooksByLanguage = async (language) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject&langRestrict=${language}&key=YOUR_API_KEY`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    fetchBooksByLanguage(language);
  };

  return (
    <div className="languages-container">
      <h2>Languages</h2>
      {loading ? (
        <p>Loading languages...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="dropdown-container">
          <select onChange={handleLanguageChange} className="language-dropdown" value={selectedLanguage}>
            <option value="">Select a language</option>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedLanguage && (
        <div className="books-container">
          <h3>Books in {selectedLanguage}</h3>
          <ul className="books-list">
            {books.length > 0 ? (
              books.map((book, index) => (
                <li key={index}>
                  <h4>{book.volumeInfo.title}</h4>
                  <p>by {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                </li>
              ))
            ) : (
              <p>No books found for {selectedLanguage}</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Languages;
