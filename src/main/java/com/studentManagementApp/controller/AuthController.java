package com.studentManagementApp.controller;

import com.studentManagementApp.entity.User;
import com.studentManagementApp.security.JwtUtil;
import com.studentManagementApp.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public AuthController(JwtUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        if(validateCredentials(user)) {
            return Map.of("token", jwtUtil.generateToken(user),"message", "success");
        }
        else
            return Map.of("message","Invalid username/password");
    }

    private boolean validateCredentials(User user) {
        User data=userService.getUserByName(user.getUsername());
        if(data==null){
            return false;
        }
        return Objects.equals(user.getUsername(), data.getUsername()) && Objects.equals(user.getPassword(), data.getPassword());
    }
}

