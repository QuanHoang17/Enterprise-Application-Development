package com.group5.gearmit.service;

import com.group5.gearmit.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ImageService {
    void storeItemImages(MultipartFile[] uploadFiles, Product product);
    List<String> getImageURLByItemID(String itemID);
}
