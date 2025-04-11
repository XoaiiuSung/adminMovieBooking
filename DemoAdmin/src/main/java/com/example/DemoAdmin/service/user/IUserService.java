package com.example.DemoAdmin.service.user;

import com.example.DemoAdmin.dto.response.UserDTO;
import com.example.DemoAdmin.entity.User;

import java.util.Optional;

public interface IUserService {

    Optional<User> findByEmail(String email);

    UserDTO getUserById(Integer userId);

    UserDTO register(UserDTO userDTO);
}