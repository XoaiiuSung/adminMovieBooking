import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { toast } from 'react-toastify';

const ShowtimeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showtime, setShowtime] = useState({
        movieId: '',
        startTime: '',
        endTime: ''
    });
    const [movies, setMovies] = useState([]); // Danh sách phim để chọn

    // Lấy danh sách phim từ API
    useEffect(() => {
        axios.get('http://localhost:8080/api/admin/movies')
            .then(response => setMovies(response.data.data))
            .catch(error => toast.error('Error fetching movies'));
    }, []);

    // Lấy thông tin lịch chiếu nếu đang sửa
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/admin/showtimes/${id}`)
                .then(response => {
                    const data = response.data.data;
                    setShowtime({
                        movieId: data.movieId,
                        startTime: new Date(data.startTime).toISOString().slice(0, 16),
                        endTime: new Date(data.endTime).toISOString().slice(0, 16)
                    });
                })
                .catch(error => toast.error(error.response?.data?.message || 'Error fetching showtime'));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShowtime({ ...showtime, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = id
            ? axios.put(`http://localhost:8080/api/admin/showtimes/${id}`, showtime)
            : axios.post('http://localhost:8080/api/admin/showtimes', showtime);

        request
            .then(response => {
                toast.success(response.data.message);
                navigate('/showtimes');
            })
            .catch(error => toast.error(error.response?.data?.message || 'Error saving showtime'));
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                {id ? 'Edit Showtime' : 'Add Showtime'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    options={movies}
                    getOptionLabel={(option) => option.title}
                    value={movies.find(movie => movie.id === showtime.movieId) || null}
                    onChange={(event, newValue) => {
                        setShowtime({ ...showtime, movieId: newValue ? newValue.id : '' });
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Movie"
                            margin="normal"
                            required
                        />
                    )}
                />
                <TextField
                    label="Start Time"
                    name="startTime"
                    type="datetime-local"
                    value={showtime.startTime}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="End Time"
                    name="endTime"
                    type="datetime-local"
                    value={showtime.endTime}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    {id ? 'Update' : 'Add'}
                </Button>
            </form>
        </Box>
    );
};

export default ShowtimeForm;