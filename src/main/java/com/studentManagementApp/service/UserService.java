package com.studentManagementApp.service;

import com.studentManagementApp.entity.User;
import com.studentManagementApp.mapper.MapperUtil;
import com.studentManagementApp.repo.UserRepository;
import dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository repository;

    @Autowired
    private MapperUtil mapperUtil;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User getUserByName(String username) {
        return repository.findByUsername(username);
    }

    public List<UserDto> getAllUsers() {
        List<User> users = repository.findAll();
        return users.stream().map(mapperUtil::toDto).collect(Collectors.toList());
    }


}
