package com.example.DemoAdmin.controller;

import com.example.DemoAdmin.dto.response.ScreenResponse;
import com.example.DemoAdmin.entity.Screen;
import com.example.DemoAdmin.mapper.IScreenMapper;
import com.example.DemoAdmin.repository.IScreenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/screens")
@RequiredArgsConstructor
public class ScreenController {

    private final IScreenRepository screenRepository;
    private final IScreenMapper screenMapper;

    @GetMapping
    public ResponseEntity<List<ScreenResponse>> getAllScreens() {
        List<Screen> screens = screenRepository.findAll();
        List<ScreenResponse> screenResponses = screens.stream()
                .map(screenMapper::toScreenResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(screenResponses);
    }

    @GetMapping("/theater/{theaterId}")
    public ResponseEntity<List<ScreenResponse>> getScreensByTheaterId(@PathVariable Integer theaterId) {
        List<Screen> screens = screenRepository.findByTheaterId(theaterId);
        List<ScreenResponse> screenResponses = screens.stream()
                .map(screenMapper::toScreenResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(screenResponses);
    }

    @GetMapping("/{screenId}")
    public ResponseEntity<ScreenResponse> getScreenById(@PathVariable Integer screenId) {
        Screen screen = screenRepository.findById(screenId)
                .orElseThrow(() -> new RuntimeException("Screen not found with id: " + screenId));
        ScreenResponse screenResponse = screenMapper.toScreenResponse(screen);
        return ResponseEntity.ok(screenResponse);
    }
}