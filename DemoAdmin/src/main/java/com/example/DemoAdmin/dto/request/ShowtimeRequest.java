package com.example.DemoAdmin.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ShowtimeRequest {
    private Integer movieId; // ID của phim
    private Integer theaterId; // ID của rạp chiếu
    private LocalDateTime startTime; // Thời gian bắt đầu suất chiếu
    private LocalDateTime endTime; // Thời gian kết thúc suất chiếu
    private Double price; // Giá vé
}