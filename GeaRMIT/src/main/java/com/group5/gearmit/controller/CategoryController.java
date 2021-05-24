package com.group5.gearmit.controller;

import com.group5.gearmit.entity.Category;
import com.group5.gearmit.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping(value = "/api/category")
    public List<Category> getAllCategory() {
        return categoryService.getAllCategory();
    }

    @PostMapping(value = "/api/category")
    public Map<String, String> insertCategory(@RequestBody Map<String, String> newCategory) {
        return categoryService.insertCategory(newCategory);
    }

    @DeleteMapping(value = "/api/category/id/{id}")
    public Map<String, String> deleteCategoryByID(@PathVariable("id") String categoryID) {
        return categoryService.deleteCategoryByID(categoryID);
    }
}
