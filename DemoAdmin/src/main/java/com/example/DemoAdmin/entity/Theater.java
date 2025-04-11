package com.example.DemoAdmin.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "theaters")
@Data
public class Theater {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "location")
    private String location;
}