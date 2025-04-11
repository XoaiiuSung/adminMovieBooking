import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ShowtimeList = () => {
    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/api/admin/showtimes')
            .then(response => {
                setShowtimes(response.data);
                setLoading(false);
            })
            .catch(error => {
                toast.error(error.response?.data?.message || 'Error fetching showtimes');
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this showtime?')) {
            axios.delete(`http://localhost:8080/api/admin/showtimes/${id}`)
                .then(() => {
                    setShowtimes(showtimes.filter(showtime => showtime.id !== id));
                    toast.success('Showtime deleted successfully');
                })
                .catch(error => toast.error(error.response?.data?.message || 'Error deleting showtime'));
        }
    };

    return (
        <div style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h4" gutterBottom>
                Showtime List
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/showtimes/add"
                style={{ marginBottom: '20px' }}
            >
                Add New Showtime
            </Button>
            {loading ? (
                <CircularProgress />
            ) : showtimes.length === 0 ? (
                <Typography variant="body1">No showtimes available.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Movie</TableCell>
                                <TableCell>Theater</TableCell>
                                <TableCell>Screen</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {showtimes.map(showtime => (
                                <TableRow key={showtime.id}>
                                    <TableCell>{showtime.id}</TableCell>
                                    <TableCell>{showtime.movieTitle}</TableCell>
                                    <TableCell>{showtime.theaterName}</TableCell>
                                    <TableCell>{showtime.screenNumber}</TableCell>
                                    <TableCell>{new Date(showtime.startTime).toLocaleString()}</TableCell>
                                    <TableCell>{new Date(showtime.endTime).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/showtimes/edit/${showtime.id}`}
                                            style={{ marginRight: '10px' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDelete(showtime.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default ShowtimeList;
