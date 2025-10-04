package com.studentManagementApp.service;

import com.studentManagementApp.entity.User;
import com.studentManagementApp.repo.UserRepository;
import org.openapitools.model.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User getUserByName(String username) {
        return repository.findByUsername(username);
    }

    public List<UserDto> getAllUsers() {
        List<User> users = repository.findAll();
        return users.stream().map(user -> {
            UserDto userDto = new UserDto();
            userDto.setId(user.getId());
            userDto.setUsername(user.getUsername());
            userDto.setPassword(user.getPassword());
            return userDto;
        }).collect(Collectors.toList());
    }


}
