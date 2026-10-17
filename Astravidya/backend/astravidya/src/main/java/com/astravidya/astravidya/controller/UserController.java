package com.astravidya.astravidya.controller;
import com.astravidya.astravidya.dto.CreateUserRequest;
import com.astravidya.astravidya.entity.User;
import com.astravidya.astravidya.repository.UserRepository;
import com.astravidya.astravidya.service.UserManagementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController
@RequestMapping("/api/users")


public class UserController {
    private final UserRepository userRepository;
    private final UserManagementService userManagementService;
    public UserController(UserRepository userRepository,UserManagementService userManagementService){
        this.userRepository=userRepository;
        this.userManagementService=userManagementService;
    }
    @PostMapping
    public ResponseEntity<?>
    createUser(@RequestBody CreateUserRequest request){
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        if(authentication==null || !authentication.isAuthenticated() || authentication.getName().equals("anonymousUser")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message","Please Login First"));
        }
        User admin=userRepository.findByUsername(authentication.getName()).orElse(null);
        if(admin==null || !"ADMIN".equals(admin.getRole())){
            return  ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message","Admin account is inactive or has no school"));
        }
        try{
            User user=userManagementService.createUser(request.getName(),
                    request.getUsername(),
                    request.getInitialPassword(),
                    request.getRole(),
                    request.getClassName(),
                    request.getLearnIn(),
                    admin.getSchool());
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message",user.getUsername(),
                    "role",user.getRole(),
                    "schoolId",admin.getSchool().getId()));
        }
        catch (IllegalArgumentException ex){
            return ResponseEntity.badRequest().body(Map.of("message",ex.getMessage()));
        }
    }

}
