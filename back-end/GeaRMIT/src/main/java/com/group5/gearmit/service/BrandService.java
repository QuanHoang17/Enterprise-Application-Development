package com.group5.gearmit.service;

import com.group5.gearmit.entity.Brand;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

public interface BrandService {
    Brand getBrandByID(String brandID);

    @Transactional
    boolean checkBrand(String name);

    @Transactional
    Map<String, String> addBrand(Map<String, String> brand);

    Map<String, String> deleteBrand(String brandName);

    List<Brand> getAllBrand();
}
