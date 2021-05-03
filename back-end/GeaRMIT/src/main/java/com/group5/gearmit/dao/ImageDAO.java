package com.group5.gearmit.dao;

import com.group5.gearmit.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageDAO extends JpaRepository<Image, Integer> {
    @Query(value = "select i.imageURL from Image i where i.itemID = :itemID")
    List<String> getImageURLByItemID(@Param("itemID") String itemID);
}
