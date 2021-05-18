package com.group5.gearmit.controller;

import com.group5.gearmit.entity.Brand;
import com.group5.gearmit.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping(value = "/api/brand")
    public List<Brand> getAllBrands() {
        return brandService.getAllBrand();
    }

    @PostMapping (value = "/api/brand")
    public Map<String, String> addBrand(@RequestBody Map<String, String> brand) {
        return brandService.addBrand(brand);
    }

    @DeleteMapping(value = "/api/brand/{brandId}")
    public Map<String, String> deleteBrandById(@PathVariable("brandId") String brandId) {
        return brandService.deleteBrandById(brandId);
    }
}
