package com.group5.gearmit.service;

import com.group5.gearmit.dao.BrandDAO;
import com.group5.gearmit.entity.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BrandServiceI implements BrandService{
    @Autowired
    BrandDAO brandDAO;

    @Override
    @Transactional
    public Brand getBrandByID(String brandID) {
        return brandDAO.getBrandByID(brandID);
    }
}
