import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/admin/movies')
            .then(response => setMovies(response.data.data))
            .catch(error => toast.error(error.response?.data?.message || 'Error fetching movies'));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            axios.delete(`http://localhost:8080/api/admin/movies/${id}`)
                .then(() => {
                    setMovies(movies.filter(movie => movie.id !== id));
                    toast.success('Movie deleted successfully');
                })
                .catch(error => toast.error(error.response?.data?.message || 'Error deleting movie'));
        }
    };

    return (
        <div style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h4" gutterBottom>
                Movie List
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/movies/add"
                style={{ marginBottom: '20px' }}
            >
                Add New Movie
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>English Title</TableCell>
                            <TableCell>Genres</TableCell>
                            <TableCell>Director</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Release Date</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Is Available</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies.map(movie => (
                            <TableRow key={movie.id}>
                                <TableCell>{movie.id}</TableCell>
                                <TableCell>{movie.title}</TableCell>
                                <TableCell>{movie.englishTitle}</TableCell>
                                <TableCell>{movie.genreNames.join(', ')}</TableCell>
                                <TableCell>{movie.directorName}</TableCell>
                                <TableCell>{movie.duration}</TableCell>
                                <TableCell>{movie.releaseDate}</TableCell>
                                <TableCell>{movie.rating}</TableCell>
                                <TableCell>{movie.isAvailable ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        component={Link}
                                        to={`/movies/edit/${movie.id}`}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(movie.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MovieList;