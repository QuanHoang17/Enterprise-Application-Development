package com.group5.gearmit.dao;

import com.group5.gearmit.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandDAO extends JpaRepository<Brand, Integer> {
}
