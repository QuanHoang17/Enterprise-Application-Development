package com.group5.gearmit.service;

import com.group5.gearmit.dao.CategoryDAO;
import com.group5.gearmit.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional
public class CategoryServiceI implements CategoryService {
    @Autowired
    CategoryDAO categoryDAO;

    @Override
    @Transactional
    public void insertCategory(Map<String, String> receivedCategory) {
        Category category = new Category();
        category.setName(receivedCategory.get("name"));
        category.setDescription(receivedCategory.get("description"));
        categoryDAO.save(category);
    }

    @Override
    @Transactional
    public Category getCategoryById(String categoryID) {
        return categoryDAO.getCategoryByID(categoryID);
    }
}
