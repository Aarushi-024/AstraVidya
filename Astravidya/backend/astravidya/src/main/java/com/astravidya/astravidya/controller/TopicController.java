package com.astravidya.astravidya.controller;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class TopicController {
    @GetMapping
    public List<String> getTopics(@RequestParam String className, @RequestParam String subject) {
        if (className.equalsIgnoreCase("Class 6") && subject.equalsIgnoreCase("Science")) {

            return Arrays.asList(
                    "Components of Food",
                    "Sorting Materials into Groups",
                    "Separation of Substances",
                    "Changes Around Us"
            );

        }
        return Arrays.asList(
                "Introduction",
                "Basic Concepts",
                "Practice"
        );
    }

}
