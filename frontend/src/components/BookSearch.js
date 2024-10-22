import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './BookSearch.css';

const BookSearch = () => {
  const [title, setTitle] = useState('');
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to fetch book data from multiple APIs
  const fetchBookData = async () => {
    setLoading(true);
    let bookInfo = null;

    // 1. Google Books API
    try {
      const googleResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}`);
      bookInfo = googleResponse.data;
      
      if (bookInfo.items && bookInfo.items.length > 0) {
        const bookId = bookInfo.items[0].id;

        // Check for Google Books download link
        const googleBookResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const accessInfo = googleBookResponse.data.accessInfo;

        if (accessInfo && accessInfo.pdf && accessInfo.pdf.downloadLink) {
          bookInfo.items[0].volumeInfo.downloadLink = accessInfo.pdf.downloadLink;
          setBookData(bookInfo);
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.log('Google Books error: ', error);
    }

    // 2. Open Library API
    // try {
    //   const openLibraryResponse = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
    //   const openLibraryBooks = openLibraryResponse.data.docs;

    //   if (openLibraryBooks.length > 0) {
    //     const openLibraryBook = openLibraryBooks[0];
    //     const openLibraryId = openLibraryBook.edition_key[0];
    //     const downloadLink = `https://openlibrary.org/books/${openLibraryId}/borrow`;
        
    //     if (!bookInfo) bookInfo = { items: [{ volumeInfo: {} }] };
    //     bookInfo.items[0].volumeInfo.downloadLink = downloadLink;
    //     setBookData(bookInfo);
    //     setLoading(false);
    //     return;
    //   }
    // } catch (error) {
    //   console.log('Open Library error: ', error);
    // }

    // 3. Project Gutenberg API
    try {
      const gutenbergResponse = await axios.get(`https://gutendex.com/books?search=${encodeURIComponent(title)}`);
      const gutenbergBooks = gutenbergResponse.data.results;

      if (gutenbergBooks.length > 0) {
        const gutenbergBook = gutenbergBooks[0];
        const downloadLink = gutenbergBook.formats['application/pdf'] || gutenbergBook.formats['text/plain'];
        
        if (!bookInfo) bookInfo = { items: [{ volumeInfo: {} }] };
        bookInfo.items[0].volumeInfo.title = gutenbergBook.title;
        bookInfo.items[0].volumeInfo.authors = gutenbergBook.authors.map(author => author.name);
        bookInfo.items[0].volumeInfo.downloadLink = downloadLink;
        setBookData(bookInfo);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log('Project Gutenberg error: ', error);
    }

    // 4. HathiTrust API
    try {
      const hathiTrustResponse = await axios.get(`https://catalog.hathitrust.org/api/volumes/brief/json?title=${encodeURIComponent(title)}`);
      const hathiTrustBooks = Object.values(hathiTrustResponse.data.items);

      if (hathiTrustBooks.length > 0) {
        const hathiBook = hathiTrustBooks[0];
        const downloadLink = hathiBook.recordURL;

        if (!bookInfo) bookInfo = { items: [{ volumeInfo: {} }] };
        bookInfo.items[0].volumeInfo.title = hathiBook.title;
        bookInfo.items[0].volumeInfo.authors = hathiBook.authors;
        bookInfo.items[0].volumeInfo.downloadLink = downloadLink;
        setBookData(bookInfo);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log('HathiTrust error: ', error);
    }

    // 5. Library of Congress API
    try {
      const locResponse = await axios.get(`https://www.loc.gov/books/?q=${encodeURIComponent(title)}&fo=json`);
      const locBooks = locResponse.data.results;

      if (locBooks.length > 0) {
        const locBook = locBooks[0];
        const downloadLink = locBook.url;

        if (!bookInfo) bookInfo = { items: [{ volumeInfo: {} }] };
        bookInfo.items[0].volumeInfo.title = locBook.title;
        bookInfo.items[0].volumeInfo.authors = locBook.contributors.map(contributor => contributor.name);
        bookInfo.items[0].volumeInfo.downloadLink = downloadLink;
        setBookData(bookInfo);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log('Library of Congress error: ', error);
    }

    // 6. National Library of Medicine API
    // try {
    //   const nlmResponse = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=books&term=${encodeURIComponent(title)}&retmode=json`);
    //   const nlmBooks = nlmResponse.data.esearchresult.idlist;

    //   if (nlmBooks.length > 0) {
    //     const nlmBookId = nlmBooks[0];
    //     const downloadLink = `https://www.ncbi.nlm.nih.gov/books/${nlmBookId}`;

    //     if (!bookInfo) bookInfo = { items: [{ volumeInfo: {} }] };
    //     bookInfo.items[0].volumeInfo.downloadLink = downloadLink;
    //     setBookData(bookInfo);
    //     setLoading(false);
    //     return;
    //   }
    // } catch (error) {
    //   console.log('National Library of Medicine error: ', error);
    // }

    // 7. WorldCat Search API
    try {
      const worldCatResponse = await axios.get(`http://www.worldcat.org/webservices/catalog/search/worldcat/sru?query=title=${encodeURIComponent(title)}&wskey=YOUR_WORLD_CAT_KEY`);
      const worldCatBooks = worldCatResponse.data;

      if (worldCatBooks && worldCatBooks.length > 0) {
        const worldCatBook = worldCatBooks[0];
        const downloadLink = worldCatBook.url;

        if (!bookInfo) bookInfo = { items: [{ volumeInfo: {} }] };
        bookInfo.items[0].volumeInfo.title = worldCatBook.title;
        bookInfo.items[0].volumeInfo.downloadLink = downloadLink;
        setBookData(bookInfo);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log('WorldCat error: ', error);
    }

    // If no book found in any source, set error
    setError('Book not found in any source');
    setBookData(null);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    setBookData(null);

    if (title) {
      fetchBookData();
    } else {
      setError('Please enter a book title');
    }
  };

  return (
    <div className="book-search">
      <h1>Search for a Book</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter book title"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className='loading'>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {bookData && bookData.items && bookData.items.length > 0 && (
        <div className="book-info">
          <h2>{bookData.items[0].volumeInfo.title}</h2>
          <p><strong>Authors:</strong> {bookData.items[0].volumeInfo.authors?.join(', ')}</p>
          <p><strong>Published Date:</strong> {bookData.items[0].volumeInfo.publishedDate}</p>
          <p><strong>Description:</strong> {bookData.items[0].volumeInfo.description}</p>

          {bookData.items[0].volumeInfo.imageLinks?.thumbnail && (
            <img
              src={bookData.items[0].volumeInfo.imageLinks.thumbnail}
              alt={bookData.items[0].volumeInfo.title}
            />
          )}

          {/* Display the download link if available */}
          {bookData.items[0].volumeInfo.downloadLink ? (
            <a
              href={bookData.items[0].volumeInfo.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="download-link"
            >
              Download PDF
            </a>
          ) : (
            <p>No download link available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
