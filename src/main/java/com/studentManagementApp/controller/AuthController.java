package com.studentManagementApp.controller;

import com.studentManagementApp.entity.User;
import com.studentManagementApp.mapper.UserMapper;
import com.studentManagementApp.security.JwtUtil;
import com.studentManagementApp.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.openapitools.api.AuthenticationApi;
import org.openapitools.model.Login200Response;
import org.openapitools.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
public class AuthController implements AuthenticationApi {
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public AuthController(JwtUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Autowired
    UserMapper userMapper;

    @Override
    public ResponseEntity<Login200Response> login(UserDto userDto) {
        Login200Response response = new Login200Response();
        if (validateCredentials(userDto)) {
            response.setToken(jwtUtil.generateToken(userMapper.toEntity(userDto)));
            response.setMessage("success");
            return ResponseEntity.ok(response);
        } else {
            response.setMessage("Invalid username/password");
            return ResponseEntity.status(401).body(response);
        }
    }

    private boolean validateCredentials(UserDto user) {
        User data = userService.getUserByName(user.getUsername());
        if (data == null) {
            return false;
        }
        return Objects.equals(user.getUsername(), data.getUsername()) && Objects.equals(user.getPassword(), data.getPassword());
    }
}

