package com.group5.gearmit.dao;

import com.group5.gearmit.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDAO extends JpaRepository<Category, String> {
    @Query(value = "SELECT c FROM Category c WHERE c.id = :id")
    Category getCategoryByID(@Param("id") String id);

    @Modifying
    @Query(value = "DELETE FROM Category c WHERE c.id = :id")
    void deleteCategoryById(@Param("id") String id);
}
