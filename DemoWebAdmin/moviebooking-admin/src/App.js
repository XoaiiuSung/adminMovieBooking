import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout'; // Import MainLayout
import HomePage from './components/HomePage';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import ShowtimeList from './components/ShowtimeList';
import ShowtimeForm from './components/ShowtimeForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Sử dụng MainLayout để bao bọc tất cả các route */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/add" element={<MovieForm />} />
            <Route path="/movies/edit/:id" element={<MovieForm />} />
            <Route path="/showtimes" element={<ShowtimeList />} />
            <Route path="/showtimes/add" element={<ShowtimeForm />} />
            <Route path="/showtimes/edit/:id" element={<ShowtimeForm />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;