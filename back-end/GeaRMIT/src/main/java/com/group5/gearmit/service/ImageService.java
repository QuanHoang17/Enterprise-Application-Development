package com.group5.gearmit.service;

import com.group5.gearmit.dto.ImageDTO;
import com.group5.gearmit.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ImageService {
    void storeItemImages(MultipartFile[] uploadFiles, Product product);
    List<ImageDTO> getImageByProductName(String productName);
    List<ImageDTO> getImageByProductCategoryName(String productCategoryName);
    List<ImageDTO> getImageByProductBrandName(String productBrandName);
    List<String> getImageURLByItemID(String itemID);
    List<ImageDTO> getAllImage();
}
