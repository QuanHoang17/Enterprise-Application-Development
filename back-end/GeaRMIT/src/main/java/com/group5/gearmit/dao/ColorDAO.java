package com.group5.gearmit.dao;

import com.group5.gearmit.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorDAO extends JpaRepository<Color, String> {
    @Query(value = "SELECT c FROM Color c WHERE c.name = :name")
    Color getColorByName(@Param("name") String name);
}
