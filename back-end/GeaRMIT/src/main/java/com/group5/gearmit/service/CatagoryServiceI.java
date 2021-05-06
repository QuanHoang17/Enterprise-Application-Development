package com.group5.gearmit.service;

import com.group5.gearmit.dao.CatagoryDAO;
import com.group5.gearmit.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional
public class CatagoryServiceI implements CategoryService {
    @Autowired
    CatagoryDAO catagoryDAO;

    @Override
    @Transactional
    public void insertCategory(Map<String, String> receivedCategory) {
        Category category = new Category();
        category.setName(receivedCategory.get("name"));
        category.setDescription(receivedCategory.get("description"));
        catagoryDAO.save(category);
    }
}
