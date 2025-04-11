import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import MainLayout from './components/MainLayout';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage'; // Import LoginPage
import AccountPage from './components/AccountPage'; // Import AccountPage
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import ShowtimeList from './components/ShowtimeList';
import ShowtimeForm from './components/ShowtimeForm';
import AccountForm from './components/AccountForm'; // Hoặc đúng đường dẫn của bạn
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            {/* Sử dụng MainLayout để bao bọc tất cả các route */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} /> {/* Thêm route cho LoginPage */}
              <Route path="/account" element={<AccountPage />} /> {/* Thêm route cho AccountPage */}
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movies/add" element={<MovieForm />} />
              <Route path="/movies/edit/:id" element={<MovieForm />} />
              <Route path="/showtimes" element={<ShowtimeList />} />
              <Route path="/showtimes/add" element={<ShowtimeForm />} />
              <Route path="/showtimes/edit/:id" element={<ShowtimeForm />} />
              <Route path="/accounts/add" element={<AccountForm />} />
            </Route>
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;