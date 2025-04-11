package com.example.DemoAdmin.repository;

import com.example.DemoAdmin.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IShowtimeRepository extends JpaRepository<Showtime, Integer> {
}