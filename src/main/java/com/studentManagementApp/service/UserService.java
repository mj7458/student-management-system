package com.studentManagementApp.service;

import com.studentManagementApp.entity.User;
import com.studentManagementApp.repo.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User getUserByName(String username){
        return repository.findByUsername(username);
    }


}
