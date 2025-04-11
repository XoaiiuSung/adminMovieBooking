package com.example.DemoAdmin.controller;

import com.example.DemoAdmin.dto.response.TheaterResponse;
import com.example.DemoAdmin.entity.Theater;
import com.example.DemoAdmin.mapper.ITheaterMapper;
import com.example.DemoAdmin.repository.ITheaterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/admin/theaters")
@RequiredArgsConstructor
public class TheaterController {

    private final ITheaterRepository theaterRepository;
    private final ITheaterMapper theaterMapper;

    @GetMapping
    public ResponseEntity<List<TheaterResponse>> getAllTheaters() {
        List<Theater> theaters = theaterRepository.findAll();
        List<TheaterResponse> theaterResponses = theaters.stream()
                .map(theaterMapper::toTheaterResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(theaterResponses);
    }
}