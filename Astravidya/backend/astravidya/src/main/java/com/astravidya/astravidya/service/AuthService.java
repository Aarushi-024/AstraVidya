package com.astravidya.astravidya.service;
import com.astravidya.astravidya.dto.LoginRequest;
import com.astravidya.astravidya.entity.User;
import com.astravidya.astravidya.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public AuthService(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.passwordEncoder=passwordEncoder;
        this.userRepository=userRepository;
    }
    public String login(LoginRequest request){
        User user=userRepository.findByUsername(request.getUsername()).orElseThrow(()-> new IllegalArgumentException("Invalid username or password"));
        if(!passwordEncoder.matches(request.getPassword(),user.getPassword())){
            throw new IllegalArgumentException("Invalid username or password");
        }
        if(!user.isActive()){
            throw new IllegalArgumentException("Account is inactive");
        }
        return "Login successful. Role: "+user.getRole();
    }
}
