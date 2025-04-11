package com.example.DemoAdmin.mapper;

import com.example.DemoAdmin.dto.request.ShowtimeRequest;
import com.example.DemoAdmin.dto.response.ShowtimeResponse;
import com.example.DemoAdmin.entity.Showtime;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface IShowtimeMapper {
    @Mapping(target = "movie.id", source = "movieId")
    @Mapping(target = "theater.id", source = "theaterId")
    Showtime toShowtime(ShowtimeRequest request);

    @Mapping(target = "movieTitle", source = "movie.title")
    @Mapping(target = "theaterName", source = "theater.name")
    ShowtimeResponse toShowtimeResponse(Showtime showtime);
}