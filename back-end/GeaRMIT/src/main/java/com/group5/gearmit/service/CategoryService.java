package com.group5.gearmit.service;

import com.group5.gearmit.entity.Category;

import java.util.Map;

public interface CategoryService {

    void insertCategory(Map<String, String> receivedCategory);

    Category getCategoryById(String categoryID);
}
