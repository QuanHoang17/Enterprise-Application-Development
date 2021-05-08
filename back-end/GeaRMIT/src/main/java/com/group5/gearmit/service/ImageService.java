package com.group5.gearmit.service;

import com.group5.gearmit.dto.ImageDTO;
import com.group5.gearmit.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ImageService {
    void deleteImageByProductID(String productID);
    Map<String, String> storeItemImage(MultipartFile uploadFile, Map<Object, Object> productInfo);
    List<ImageDTO> getImageByProductName(String productName);
    List<ImageDTO> getImageByProductCategoryName(String productCategoryName);
    List<ImageDTO> getImageByProductBrandName(String productBrandName);
    List<ImageDTO> getAllImage();
}
