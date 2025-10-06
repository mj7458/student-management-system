package com.studentManagementApp.controller;

import api.UsersApi;
import com.studentManagementApp.service.UserService;
import dto.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class UserController implements UsersApi {
    @Autowired
    private UserService userService;

    @Override
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers(); // fetch from DB or service
        return ResponseEntity.ok(users);
    }

    @Override
    public ResponseEntity<UserDto> addUser(UserDto userDto) {
        UserDto createdUser = userService.addUser(userDto); // save to DB or service
        return ResponseEntity.ok(createdUser);
    }
}
