package com.group5.gearmit.dao;

import com.group5.gearmit.entity.ProductColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductColorDAO extends JpaRepository<ProductColor, Integer> {
}
