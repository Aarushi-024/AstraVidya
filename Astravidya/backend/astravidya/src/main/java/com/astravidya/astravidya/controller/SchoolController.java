package com.astravidya.astravidya.controller;
import com.astravidya.astravidya.dto.SchoolRegisterRequest;
import com.astravidya.astravidya.service.SchoolService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/schools")
public class SchoolController {
    private final SchoolService schoolService;
    private SchoolController(SchoolService schoolService){
        this.schoolService=schoolService;
    }
    @PostMapping("/register")
    public ResponseEntity<String> registerSchool(@RequestBody SchoolRegisterRequest request){
        String result=schoolService.registerSchool(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}
