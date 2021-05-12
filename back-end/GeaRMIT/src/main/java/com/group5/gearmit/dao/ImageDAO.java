package com.group5.gearmit.dao;

import com.group5.gearmit.dto.ImageDTO;
import com.group5.gearmit.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageDAO extends JpaRepository<Image, String> {
    @Query(value = "SELECT i.name FROM Image i WHERE i.name = :itemID")
    List<String> getImageURLByItemID(@Param("itemID") String itemID);

    @Query(value = "SELECT new com.group5.gearmit.dto.ImageDTO(i.id, i.name, i.product.id) FROM Image i")
    List<ImageDTO> getAllImage();

    @Query(value = "SELECT new com.group5.gearmit.dto.ImageDTO(i.id, i.name, i.product.id) " +
            "FROM Image i " +
            "WHERE i.product.id = :id")
    List<ImageDTO> getImageByProductId(@Param("id") String id);

    @Query(value = "SELECT new com.group5.gearmit.dto.ImageDTO(i.id, i.name, i.product.id) " +
            "FROM Image i " +
            "WHERE i.product.name = :name")
    List<ImageDTO> getImageByProductName(@Param("name") String name);

    @Query(value = "SELECT new com.group5.gearmit.dto.ImageDTO(i.id, i.name, i.product.id) " +
            "FROM Image i " +
            "WHERE i.product.category.name = :name")
    List<ImageDTO> getImageByProductCategoryName(@Param("name") String name);

    @Query(value = "SELECT new com.group5.gearmit.dto.ImageDTO(i.id, i.name, i.product.id) " +
            "FROM Image i " +
            "WHERE i.product.brand.name = :name")
    List<ImageDTO> getImageByProductBrandName(@Param("name") String name);

    @Modifying
    @Query("DELETE FROM Image i WHERE i.id = :id")
    void deleteImageByID(@Param("id") String id);
}
