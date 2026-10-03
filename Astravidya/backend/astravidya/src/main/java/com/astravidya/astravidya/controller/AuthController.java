package com.astravidya.astravidya.controller;
import com.astravidya.astravidya.dto.LoginRequest;
import com.astravidya.astravidya.dto.RegisterRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")

public class AuthController {
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){
        return "Registration Successful for" + request.getName();
    }
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request){
        return "Login successful for" +request.getUsername();
    }
}
