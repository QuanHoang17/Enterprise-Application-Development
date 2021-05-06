package com.group5.gearmit.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class ProductController {
    @GetMapping("/api/items")
    public List<Object> getAllItems() {
        return new ArrayList<>();
    }
}
