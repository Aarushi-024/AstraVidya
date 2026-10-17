package com.astravidya.astravidya.service;

import com.astravidya.astravidya.dto.SchoolRegisterRequest;
import com.astravidya.astravidya.entity.School;
import com.astravidya.astravidya.entity.User;
import com.astravidya.astravidya.repository.SchoolRepository;
import com.astravidya.astravidya.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
public class SchoolService {
    private final SchoolRepository schoolRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public SchoolService(  SchoolRepository schoolRepository,UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.schoolRepository=schoolRepository;
        this.passwordEncoder=passwordEncoder;
        this.userRepository=userRepository;
    }
    @Transactional
    public String registerSchool(SchoolRegisterRequest request){
        if(schoolRepository.existsBySchoolCode(request.getSchoolCode())){
            throw new IllegalArgumentException("School code already exists");
        }
        School school=new School();
        school.setSchoolName(request.getSchoolName());
        school.setSchoolCode(request.getSchoolCode());
        school.setAdminName(request.getAdminName());
        school.setAdminEmail(request.getAdminEmail());
        school.setPhoneNumber(request.getPhoneNumber());

        school =schoolRepository.save(school);

        String username=request.getAdminEmail().trim().toLowerCase();
        if(userRepository.existsByUsername(username)){
            throw new IllegalArgumentException("Admin account already exists");
        }
        User admin=new User();
        admin.setName(request.getAdminName());
        admin.setUsername(username);
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin.setRole("ADMIN");
        admin.setSchool(school);

        userRepository.save(admin);
        return "School registered successfully.Admin username: " + username;
    }
}
