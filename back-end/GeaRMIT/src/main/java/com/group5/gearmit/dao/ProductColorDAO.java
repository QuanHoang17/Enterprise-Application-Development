package com.group5.gearmit.dao;

import com.group5.gearmit.dto.ProductColorDTO;
import com.group5.gearmit.entity.ProductColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductColorDAO extends JpaRepository<ProductColor, ProductColor.ProductColorPK> {
    @Query(value = "SELECT new com.group5.gearmit.dto.ProductColorDTO(cp.productColorPK.color.name, cp.productColorPK.product.id) " +
            "FROM ProductColor cp")
    List<ProductColorDTO> getAllColor();

    @Query(value = "SELECT new com.group5.gearmit.dto.ProductColorDTO(cp.productColorPK.color.name, cp.productColorPK.product.id) " +
            "FROM ProductColor cp " +
            "WHERE cp.productColorPK.product.id = :id")
    List<ProductColorDTO> getColorByProductID(@Param("id") String id);

    @Query(value = "SELECT new com.group5.gearmit.dto.ProductColorDTO(cp.productColorPK.color.name, cp.productColorPK.product.id) " +
            "FROM ProductColor cp " +
            "WHERE cp.productColorPK.product.name = :name")
    List<ProductColorDTO> getColorByProductName(@Param("name") String name);

    @Query(value = "SELECT new com.group5.gearmit.dto.ProductColorDTO(cp.productColorPK.color.name, cp.productColorPK.product.id) " +
            "FROM ProductColor cp " +
            "WHERE cp.productColorPK.product.category.name = :name")
    List<ProductColorDTO> getColorByProductCategoryName(@Param("name") String name);

    @Query(value = "SELECT new com.group5.gearmit.dto.ProductColorDTO(cp.productColorPK.color.name, cp.productColorPK.product.id) " +
            "FROM ProductColor cp " +
            "WHERE cp.productColorPK.product.brand.name = :name")
    List<ProductColorDTO> getColorByProductBrandName(@Param("name") String name);

    @Modifying
    @Query(value = "DELETE FROM ProductColor cp WHERE cp.productColorPK.product.id = :id")
    void deleteProductColorByProductID(@Param("id") String id);
}
