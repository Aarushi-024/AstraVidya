package com.astravidya.astravidya.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {
    @GetMapping
    public List<String>getSubjects(@RequestParam String className){
        if (className.equalsIgnoreCase("KG")) {
            return Arrays.asList(
                    "English",
                    "Hindi",
                    "Mathematics",
                    "General Awareness"
            );
        }
        return Arrays.asList(
                "Mathematics",
                "Science",
                "English",
                "Hindi",
                "Social Science"
        );
    }




}
