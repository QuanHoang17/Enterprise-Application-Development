package com.group5.gearmit.service;

import com.group5.gearmit.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ProductService {

    List<Map<String, Object>> getAllProduct();

    List<Map<String, Object>> getProductByName(String productName);

    List<Map<String, Object>> getProductByCategoryName(String productCategoryName);

    List<Map<String, Object>> getProductByBrandName(String productBrandName);

    Map<String, String> addProduct(Map<Object, Object> product);

    Map<String, String> deleteProduct(String productID);

    Product getProductObjectByID(String productID);
}
