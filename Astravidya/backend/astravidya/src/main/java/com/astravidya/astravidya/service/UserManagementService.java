package com.astravidya.astravidya.service;

import com.astravidya.astravidya.entity.User;
import com.astravidya.astravidya.entity.School;
import com.astravidya.astravidya.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserManagementService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserManagementService(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.passwordEncoder=passwordEncoder;
        this.userRepository=userRepository;

    }
    @Transactional
    public User createUser(String name,
                           String username,
                           String initialPassword,
                           String role,
                           String className,
                           String learnIn,
                           School school){
        if(name == null || name.isBlank() || username==null || username.isBlank() || initialPassword==null || initialPassword.isBlank()){
            throw new  IllegalArgumentException("Name, username and password are required");
        }
        if(!"TEACHER".equals(role) && !"STUDENT".equals(role)){
            throw new IllegalArgumentException("Only teacher and student accounts can be created here");

        }
        if(school==null || school.getId() == null){
            throw new IllegalArgumentException("A saved school must be provided");
        }
        if (userRepository.existsByUsername(username)){
            throw new IllegalArgumentException("Username already exists");
        }
        User user =new User();
        user.setName(name.trim());
        user.setUsername(username.trim());
        user.setPassword(passwordEncoder.encode(initialPassword));
        user.setRole(role);
        user.setClassName(className);
        user.setSchool(school);
        user.setActive(true);
         return userRepository.save(user);

    }
}
