package com.group5.gearmit.dao;

import com.group5.gearmit.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatagoryDAO extends JpaRepository<Category, Integer> {
}
