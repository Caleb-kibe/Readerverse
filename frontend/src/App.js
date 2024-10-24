import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/context/AuthProvider'; // Adjust the path if necessary
import LandingPage from './components/LandingPage';
import Layout from './components/Layout';
import NewReleases from './components/NewReleases';
import Genres from './components/Genres';
import Authors from './components/Authors';
import Languages from './components/Languages';
import BookSearch from './components/BookSearch';
import Login from './auth/components/Login';
import Signup from './auth/components/Signup';

const App = () => {
  return (
    <AuthProvider> {/* Wrap everything in AuthProvider */}
      <Router>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          
          {/* Other routes wrapped in Layout */}
          <Route element={<Layout />}>
            <Route path="/search" element={<BookSearch />} />
            <Route path="/new-releases" element={<NewReleases />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/languages" element={<Languages />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
