package com.group5.gearmit.controller;

import com.group5.gearmit.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping(value = "/api/category")
    public Map<String, String> insertCategory(@RequestBody Map<String, String> category) {
        categoryService.insertCategory(category);
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        return response;
    }
}
