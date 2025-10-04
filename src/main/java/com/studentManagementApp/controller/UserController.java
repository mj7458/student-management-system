package com.studentManagementApp.controller;

import com.studentManagementApp.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.openapitools.api.UsersApi;
import org.openapitools.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@Tag(name = "Users", description = "Operations related to users of application")
public class UserController implements UsersApi {
    @Autowired
    private UserService userService;

    @Override
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers(); // fetch from DB or service
        return ResponseEntity.ok(users);
    }


}
