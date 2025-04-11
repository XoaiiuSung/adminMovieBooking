import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
                <h1>Admin - Movie Management</h1>
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/add" element={<MovieForm />} />
                    <Route path="/edit/:id" element={<MovieForm />} />
                    <Route path="/showtimes" element={<ShowtimeList />} />
                    <Route path="/showtimes/add" element={<ShowtimeForm />} />
                    <Route path="/showtimes/edit/:id" element={<ShowtimeForm />} />
                </Routes>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;