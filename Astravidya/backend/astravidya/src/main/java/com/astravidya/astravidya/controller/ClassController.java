package com.astravidya.astravidya.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
@RestController
@RequestMapping("/api/classes")


public class ClassController {
    @GetMapping
    public List <String> getClasses(){
        return Arrays.asList(
                "KG",
                "Class 1",
                "Class 2",
                "Class 3",
                "Class 4",
                "Class 5",
                "Class 6",
                "Class 7",
                "Class 8"
        );
    }

}
