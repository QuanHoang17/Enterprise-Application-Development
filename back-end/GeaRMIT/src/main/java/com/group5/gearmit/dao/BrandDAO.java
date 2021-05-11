package com.group5.gearmit.dao;

import com.group5.gearmit.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandDAO extends JpaRepository<Brand, String> {
    @Query(value = "SELECT b FROM Brand b WHERE b.id = :id")
    Brand getBrandByID(@Param("id") String id);
}
