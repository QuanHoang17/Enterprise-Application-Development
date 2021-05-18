package com.group5.gearmit.service;

import com.group5.gearmit.entity.Brand;

import java.util.List;
import java.util.Map;

public interface BrandService {

    Brand getBrandByID(String brandID);

    boolean checkBrandName(String name);

    Map<String, String> addBrand(Map<String, String> brand);

    Map<String, String> deleteBrandById(String brandId);

    List<Brand> getAllBrand();
}
