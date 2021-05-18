package com.group5.gearmit.service;

import com.group5.gearmit.entity.Category;

import java.util.List;
import java.util.Map;

public interface CategoryService {

    Map<String, String> insertCategory(Map<String, String> receivedCategory);

    Map<String, String> deleteCategoryByID(String id);

    Category getCategoryById(String categoryID);

    List<Category> getAllCategory();
}
