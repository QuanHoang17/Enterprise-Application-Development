package com.group5.gearmit.controller;

import com.group5.gearmit.entity.Product;
import com.group5.gearmit.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping(value = "/api/product")
    public List<Map<String, Object>> getAllProduct() {
        return productService.getAllProduct();
    }

    @GetMapping(value = "/api/product/name/{name}")
    public List<Map<String, Object>> getProductByName(@PathVariable("name") String productName) {
        return productService.getProductByName(productName);
    }

    @GetMapping(value = "/api/product/category_name/{name}")
    public List<Map<String, Object>> getProductByCategoryName(@PathVariable("name") String categoryName) {
        return productService.getProductByCategoryName(categoryName);
    }

    @GetMapping(value = "/api/product/brand_name/{name}")
    public List<Map<String, Object>> getProductByBrandName(@PathVariable("name") String brandName) {
        return productService.getProductByBrandName(brandName);
    }

    @PostMapping(value = "/api/product", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public Map<String, String> addProduct(@RequestPart("images") MultipartFile[] images,
                                          @RequestPart("product") Map<Object, Object> product) {
        return productService.addProduct(images, product);
    }

    @DeleteMapping(value = "/api/product/{productID}")
    public Map<String, String> deleteProductByID(@PathVariable("productID") String productID) {
        return new HashMap<>();
    }
}
