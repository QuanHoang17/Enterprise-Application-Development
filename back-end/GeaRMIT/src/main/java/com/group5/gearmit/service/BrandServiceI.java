package com.group5.gearmit.service;

import com.group5.gearmit.dao.BrandDAO;
import com.group5.gearmit.entity.Brand;
import com.group5.gearmit.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class BrandServiceI implements BrandService{

    private BrandDAO brandDAO;

    @Autowired
    public BrandServiceI(BrandDAO brandDAO) {
        this.brandDAO = brandDAO;
    }

    @Override
    @Transactional
    public Brand getBrandByID(String brandID) {
        return brandDAO.getBrandByID(brandID);
    }

    @Override
    @Transactional
    // Check if brand has existed or not
    public boolean checkBrand(String name) {
        Brand brand = brandDAO.getBrandByName(name);
        return brand != null;
    }

    @Override
    @Transactional
    public Map<String, String> addBrand(Map<String, String> brand){
        Map<String, String> response = new HashMap<>();
        boolean brandExisted = checkBrand(brand.get("name"));

        if (brandExisted) {
            response.put("brand", "existed");
        } else {
            response.put("brand", "available");
        }

        if (!brandExisted) {
            Brand newBrand = new Brand();
            newBrand.setName(brand.get("name"));
            brandDAO.save(newBrand);
            response.put("status", "success");

            return response;
        }
        response.put("status", "failed");
        return response;
    }

    @Override
    public Map<String, String> deleteBrand(String brandName) {
        return null;
    }

    @Override
    public List<Brand> getAllBrand() {
        return brandDAO.findAll();
    }
}
