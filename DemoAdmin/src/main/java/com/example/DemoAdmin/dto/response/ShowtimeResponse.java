package com.example.DemoAdmin.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ShowtimeResponse {
    private Integer id; // ID của suất chiếu
    private String movieTitle; // Tiêu đề phim
    private String theaterName; // Tên rạp chiếu
    private LocalDateTime startTime; // Thời gian bắt đầu
    private LocalDateTime endTime; // Thời gian kết thúc
    private Double price; // Giá vé
}