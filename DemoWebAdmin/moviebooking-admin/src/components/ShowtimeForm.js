import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Autocomplete, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const ShowtimeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showtime, setShowtime] = useState({
        movieId: '',
        screenId: '',
        startTime: '',
        endTime: ''
    });
    const [movies, setMovies] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [screens, setScreens] = useState([]);
    const [selectedTheater, setSelectedTheater] = useState(null);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const [loadingTheaters, setLoadingTheaters] = useState(true);
    const [loadingScreens, setLoadingScreens] = useState(false);
    const [loadingShowtime, setLoadingShowtime] = useState(!!id);

    useEffect(() => {
        axios.get('http://localhost:8080/api/admin/movies')
            .then(response => {
                console.log('Movies:', response.data.data);
                setMovies(Array.isArray(response.data.data) ? response.data.data : []);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                toast.error('Error fetching movies: ' + (error.response?.data?.message || error.message));
                setMovies([]);
            })
            .finally(() => setLoadingMovies(false));

        axios.get('http://localhost:8080/api/admin/theaters')
            .then(response => {
                console.log('Theaters:', response.data);
                setTheaters(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error('Error fetching theaters:', error);
                toast.error('Error fetching theaters: ' + (error.response?.data?.message || error.message));
                setTheaters([]);
            })
            .finally(() => setLoadingTheaters(false));

        if (id) {
            axios.get(`http://localhost:8080/api/admin/showtimes/${id}`)
                .then(response => {
                    const showtimeData = response.data;
                    console.log('Showtime Data:', showtimeData);
                    setShowtime({
                        movieId: showtimeData.movieId || '',
                        screenId: showtimeData.screenId || '',
                        startTime: showtimeData.startTime ? new Date(showtimeData.startTime).toISOString().slice(0, 16) : '',
                        endTime: showtimeData.endTime ? new Date(showtimeData.endTime).toISOString().slice(0, 16) : ''
                    });
                    if (showtimeData.screenId) {
                        axios.get(`http://localhost:8080/api/admin/screens/${showtimeData.screenId}`)
                            .then(screenResponse => {
                                const screen = screenResponse.data;
                                console.log('Screen Data:', screen);
                                setSelectedTheater(screen.theater || null);
                                if (screen.theater) {
                                    setLoadingScreens(true);
                                    axios.get(`http://localhost:8080/api/admin/screens/theater/${screen.theater.id}`)
                                        .then(screensResponse => {
                                            console.log('Screens:', screensResponse.data);
                                            setScreens(Array.isArray(screensResponse.data) ? screensResponse.data : []);
                                        })
                                        .catch(error => {
                                            console.error('Error fetching screens for theater:', error);
                                            toast.error('Error fetching screens for theater: ' + (error.response?.data?.message || error.message));
                                            setScreens([]);
                                        })
                                        .finally(() => setLoadingScreens(false));
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching screen for theater:', error);
                                toast.error('Error fetching screen for theater: ' + (error.response?.data?.message || error.message));
                            });
                    }
                })
                .catch(error => {
                    console.error('Error fetching showtime:', error);
                    toast.error('Error fetching showtime: ' + (error.response?.data?.message || error.message));
                })
                .finally(() => setLoadingShowtime(false));
        }
    }, [id]);

    useEffect(() => {
        if (selectedTheater && !id) {
            setLoadingScreens(true);
            axios.get(`http://localhost:8080/api/admin/screens/theater/${selectedTheater.id}`)
                .then(response => {
                    console.log('Screens:', response.data);
                    setScreens(Array.isArray(response.data) ? response.data : []);
                })
                .catch(error => {
                    console.error('Error fetching screens:', error);
                    toast.error('Error fetching screens: ' + (error.response?.data?.message || error.message));
                    setScreens([]);
                })
                .finally(() => setLoadingScreens(false));
        } else if (!selectedTheater) {
            setScreens([]);
            setShowtime(prev => ({ ...prev, screenId: '' }));
        }
    }, [selectedTheater, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShowtime({ ...showtime, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const showtimeToSubmit = {
            ...showtime,
            startTime: new Date(showtime.startTime).toISOString(),
            endTime: new Date(showtime.endTime).toISOString()
        };
        const request = id
            ? axios.put(`http://localhost:8080/api/admin/showtimes/${id}`, showtimeToSubmit)
            : axios.post('http://localhost:8080/api/admin/showtimes', showtimeToSubmit);

        request
            .then(response => {
                toast.success(response.data.message || 'Showtime saved successfully');
                navigate('/showtimes'); // Đã đúng, giữ nguyên
            })
            .catch(error => toast.error(error.response?.data?.message || 'Error saving showtime'));
    };

    const isLoading = loadingMovies || loadingTheaters || loadingShowtime;

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, height: '100%' }}>
            <Typography variant="h4" gutterBottom>
                {id ? 'Edit Showtime' : 'Add Showtime'}
            </Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <form onSubmit={handleSubmit}>
                    <Autocomplete
                        options={movies}
                        getOptionLabel={(option) => option.title || ''}
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
                        disabled={loadingMovies}
                    />
                    <Autocomplete
                        options={theaters}
                        getOptionLabel={(option) => option.name || ''}
                        value={selectedTheater}
                        onChange={(event, newValue) => {
                            setSelectedTheater(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Theater"
                                margin="normal"
                                required
                            />
                        )}
                        disabled={loadingTheaters}
                    />
                    <Autocomplete
                        options={screens}
                        getOptionLabel={(option) => option.screenNumber || ''}
                        value={screens.find(screen => screen.id === showtime.screenId) || null}
                        onChange={(event, newValue) => {
                            setShowtime({ ...showtime, screenId: newValue ? newValue.id : '' });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Screen"
                                margin="normal"
                                required
                            />
                        )}
                        disabled={loadingScreens || !selectedTheater}
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
                        disabled={isLoading || loadingScreens}
                    >
                        {id ? 'Update' : 'Add'}
                    </Button>
                </form>
            )}
        </Box>
    );
};

export default ShowtimeForm;