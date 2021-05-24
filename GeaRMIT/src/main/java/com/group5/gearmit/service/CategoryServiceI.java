package com.group5.gearmit.service;

import com.group5.gearmit.dao.CategoryDAO;
import com.group5.gearmit.entity.Brand;
import com.group5.gearmit.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class CategoryServiceI implements CategoryService {

    @Autowired
    private CategoryDAO categoryDAO;

    @Transactional
    public boolean checkCategoryExist(String name) {
        Category category = categoryDAO.getCategoryByName(name);
        return category != null;
    }

    @Override
    @Transactional
    public Category getCategoryById(String categoryID) {
        return categoryDAO.getCategoryByID(categoryID);
    }

    @Override
    @Transactional
    public Map<String, String> insertCategory(Map<String, String> newCategory) {
        Map<String, String> response = new HashMap<>();

        // Check if category existed
        boolean categoryExisted = checkCategoryExist(newCategory.get("name"));
        if (categoryExisted) {
            response.put("category", "existed");
            response.put("status", "failed");
            return response;
        } else {
            response.put("category", "available");

        }

        // Add category
        Category category = new Category();
        category.setName(newCategory.get("name"));
        category.setDescription(newCategory.get("description"));
        categoryDAO.save(category);

        response.put("status", "success");
        return response;
    }

    @Override
    @Transactional
    public Map<String, String> deleteCategoryByID(String id) {
        Map<String, String> response = new HashMap<>();
        categoryDAO.deleteCategoryById(id);
        response.put("status", "success");
        return response;
    }

    @Override
    @Transactional
    public List<Category> getAllCategory() {
        return categoryDAO.findAll();
    }
}
