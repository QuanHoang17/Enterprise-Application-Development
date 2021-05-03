package com.group5.gearmit.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ImageService {
    void storeItemImages(MultipartFile[] uploadFiles, String itemID, String itemName);
    List<String> getImageURLByItemID(String itemID);
}
