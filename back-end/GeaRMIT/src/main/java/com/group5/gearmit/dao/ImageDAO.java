package com.group5.gearmit.dao;

import com.group5.gearmit.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageDAO extends JpaRepository<Image, Integer> {
    @Query(value = "SELECT i.imageName FROM Image i WHERE i.imageName = :itemID")
    List<String> getImageURLByItemID(@Param("itemID") String itemID);
}
