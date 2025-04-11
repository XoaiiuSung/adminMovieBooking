package com.example.DemoAdmin.service.user;

import com.example.DemoAdmin.dto.response.UserDTO;
import com.example.DemoAdmin.entity.User;
import com.example.DemoAdmin.repository.IUserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(IUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDTO getUserById(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setEmail(user.getEmail());
        userDTO.setFullName(user.getFullName());
        userDTO.setPhone(user.getPhone());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setAddress(user.getAddress());
        userDTO.setAvatar(user.getAvatar());
        userDTO.setRole(user.getRole());
        userDTO.setProviderId(user.getProviderId());
        userDTO.setUid(user.getUid());
        userDTO.setIdToken(user.getIdToken());

        return userDTO;
    }

    @Override
    public UserDTO register(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists: " + userDTO.getEmail());
        }

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPasswordHash(passwordEncoder.encode(userDTO.getPassword()));
        user.setFullName(userDTO.getFullName());
        user.setPhone(userDTO.getPhone());
        user.setCreatedAt(LocalDateTime.now());
        user.setAddress(userDTO.getAddress());
        user.setAvatar(userDTO.getAvatar());
        user.setRole(userDTO.getRole());
        user.setProviderId(userDTO.getProviderId());
        user.setUid(userDTO.getUid());
        user.setIdToken(userDTO.getIdToken());

        user = userRepository.save(user);

        userDTO.setUserId(user.getUserId());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setPassword(null);

        return userDTO;
    }
}