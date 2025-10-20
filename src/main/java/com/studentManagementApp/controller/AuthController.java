package com.studentManagementApp.controller;

import api.AuthenticationApi;
import com.studentManagementApp.entity.User;
import com.studentManagementApp.mapper.MapperUtilImpl;
import com.studentManagementApp.security.JwtUtil;
import com.studentManagementApp.service.UserService;
import dto.Login200Response;
import dto.UserDto;
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
    MapperUtilImpl mapperUtil;

    @Override
    public ResponseEntity<Login200Response> login(UserDto userDto) {
        Login200Response response = new Login200Response();
        User data = userService.getUserByName(userDto.getUsername());
        if (validateCredentials(userDto, data)) {
            response.setToken(jwtUtil.generateToken(mapperUtil.toEntity(userDto)));
            response.setMessage("success");
            response.setUserName(data.getUsername());
            response.setUserRole(data.getRole());
            return ResponseEntity.ok(response);
        } else {
            response.setMessage("Invalid username/password");
            return ResponseEntity.status(401).body(response);
        }
    }

    private boolean validateCredentials(UserDto user, User data) {
        if (data == null) {
            return false;
        }
        return Objects.equals(user.getUsername(), data.getUsername()) && Objects.equals(user.getPassword(), data.getPassword());
    }
}

