package com.group5.gearmit.dao;

import com.group5.gearmit.entity.Product;
import com.group5.gearmit.dto.ProductDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDAO extends JpaRepository<Product, Integer> {
//    @Query(value = "SELECT new com.group5.gearmit.dto.ProductDTO(p.id, p.description, p.issueDate, p.price, p.quantity, p.name, b.name, c.name, i.name) FROM Product p " +
//            "INNER JOIN p.brand b " +
//            "INNER JOIN p.category c " +
//            "INNER JOIN p.images i")
//    List<ProductDTO> getAllProduct();
    @Query(value = "SELECT new com.group5.gearmit.dto.ProductDTO(p.id, p.name, p.quantity, p.issueDate, p.category.name, p.brand.name, p.price, p.description) " +
            "FROM Product p")
    List<ProductDTO> getAllProduct();

    @Query(value = "SELECT new com.group5.gearmit.dto.ProductDTO(p.id, p.name, p.quantity, p.issueDate, p.category.name, p.brand.name, p.price, p.description) " +
            "FROM Product p " +
            "WHERE p.name = :name")
    List<ProductDTO> getProductByName(@Param("name") String name);

    @Query(value = "SELECT new com.group5.gearmit.dto.ProductDTO(p.id, p.name, p.quantity, p.issueDate, p.category.name, p.brand.name, p.price, p.description) " +
            "FROM Product p " +
            "WHERE p.category.name = :name")
    List<ProductDTO> getProductByCategoryName(@Param("name") String name);

    @Query(value = "SELECT new com.group5.gearmit.dto.ProductDTO(p.id, p.name, p.quantity, p.issueDate, p.category.name, p.brand.name, p.price, p.description) " +
            "FROM Product p " +
            "WHERE p.brand.name = :name")
    List<ProductDTO> getProductByBrandName(@Param("name") String name);
}
