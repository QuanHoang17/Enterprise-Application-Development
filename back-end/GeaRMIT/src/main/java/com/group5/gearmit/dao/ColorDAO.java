package com.group5.gearmit.dao;

import com.group5.gearmit.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorDAO extends JpaRepository<Color, Integer> {
}
