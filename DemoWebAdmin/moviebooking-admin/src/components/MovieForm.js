import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Chip, Autocomplete } from '@mui/material';
import { toast } from 'react-toastify';

const MovieForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        title: '',
        description: '',
        releaseDate: '',
        duration: '',
        directorId: '',
        trailerUrl: '',
        englishTitle: '',
        isAvailable: false,
        posterUrl: '',
        rating: '',
        genreIds: []
    });
    const [genres, setGenres] = useState([]); // Danh sách thể loại để chọn
    const [genresLoaded, setGenresLoaded] = useState(false); // Trạng thái tải genres

    // Lấy danh sách thể loại trước, sau đó lấy dữ liệu phim
    useEffect(() => {
        // Lấy danh sách thể loại
        axios.get('http://localhost:8080/api/admin/genres')
            .then(response => {
                console.log("Danh sách thể loại từ API /api/admin/genres:", response.data.data);
                setGenres(response.data.data);
                setGenresLoaded(true);
                if (response.data.data.length === 0) {
                    toast.warn('No genres available. Please add some genres first.');
                }

                // Sau khi lấy genres, lấy dữ liệu phim (nếu có id)
                if (id) {
                    axios.get(`http://localhost:8080/api/admin/movies/${id}`)
                        .then(movieResponse => {
                            const movieData = movieResponse.data.data;
                            console.log("Dữ liệu phim từ API /api/admin/movies/{id}:", movieData);
                            const formattedReleaseDate = movieData.releaseDate
                                ? new Date(movieData.releaseDate).toISOString().split('T')[0]
                                : '';
                            const genreIdsArray = movieData.genreIds
                                ? Array.from(movieData.genreIds)
                                : [];
                            setMovie({
                                ...movieData,
                                releaseDate: formattedReleaseDate,
                                genreIds: genreIdsArray,
                                directorId: movieData.directorId ? String(movieData.directorId) : '', // Chuyển directorId thành string
                            });
                        })
                        .catch(error => {
                            console.error("Lỗi khi lấy dữ liệu phim:", error);
                            toast.error(error.response?.data?.message || 'Error fetching movie');
                        });
                }
            })
            .catch(error => {
                console.error("Lỗi khi lấy danh sách thể loại:", error);
                toast.error('Error fetching genres');
                setGenresLoaded(true);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMovie({ ...movie, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Chuyển đổi kiểu dữ liệu trước khi gửi
        const movieToSubmit = {
            ...movie,
            duration: parseInt(movie.duration, 10),
            directorId: parseInt(movie.directorId, 10),
            rating: movie.rating ? parseFloat(movie.rating) : null,
        };
        console.log("Dữ liệu gửi đi:", movieToSubmit);
        const request = id
            ? axios.put(`http://localhost:8080/api/admin/movies/${id}`, movieToSubmit)
            : axios.post('http://localhost:8080/api/admin/movies', movieToSubmit);

        request
            .then(response => {
                toast.success(response.data.message);
                navigate('/');
            })
            .catch(error => {
                console.error("Lỗi từ backend:", error.response?.data);
                toast.error(error.response?.data?.message || 'Error saving movie');
            });
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                {id ? 'Edit Movie' : 'Add Movie'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    value={movie.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <TextField
                    label="Release Date"
                    name="releaseDate"
                    type="date"
                    value={movie.releaseDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="Duration (minutes)"
                    name="duration"
                    type="number"
                    value={movie.duration}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Director ID"
                    name="directorId"
                    type="number"
                    value={movie.directorId}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Trailer URL"
                    name="trailerUrl"
                    value={movie.trailerUrl}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="English Title"
                    name="englishTitle"
                    value={movie.englishTitle}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Poster URL"
                    name="posterUrl"
                    value={movie.posterUrl}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Rating"
                    name="rating"
                    type="number"
                    value={movie.rating}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    inputProps={{ step: "0.1" }}
                />
                <TextField
                    label="Is Available"
                    name="isAvailable"
                    type="checkbox"
                    checked={movie.isAvailable}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                {genresLoaded ? (
                    <Autocomplete
                        multiple
                        options={genres}
                        getOptionLabel={(option) => option.name}
                        value={genres.filter(genre => (movie.genreIds || []).includes(genre.id))}
                        onChange={(event, newValue) => {
                            const newGenreIds = newValue.map(genre => genre.id);
                            console.log("Thể loại đã chọn (genreIds):", newGenreIds);
                            setMovie({ ...movie, genreIds: newGenreIds });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Genres"
                                margin="normal"
                            />
                        )}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    key={option.id}
                                    label={option.name}
                                    onDelete={() => {
                                        const newGenreIds = movie.genreIds.filter(id => id !== option.id);
                                        setMovie({ ...movie, genreIds: newGenreIds });
                                    }}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                    />
                ) : (
                    <Typography color="textSecondary">Loading genres...</Typography>
                )}
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

export default MovieForm;