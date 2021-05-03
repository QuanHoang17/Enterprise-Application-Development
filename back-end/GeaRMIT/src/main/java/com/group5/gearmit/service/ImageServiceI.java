package com.group5.gearmit.service;

import com.group5.gearmit.dao.ImageDAO;
import com.group5.gearmit.model.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Transactional
public class ImageServiceI implements ImageService {
    @Autowired
    private FileService fileService;

    @Autowired
    private ImageDAO imageDAO;

    @Override
    @Transactional
    // ID and name will be replaced with item object
    public void storeItemImages(MultipartFile[] uploadFiles, String itemID, String itemName) {
        String basedFileName = itemID + "_" + itemName;
        List<String> imageURLList = fileService.storeImageFile(uploadFiles, basedFileName);
        for(String imageURL:imageURLList) {
            Image image = new Image();
            image.setItemID(itemID);
            image.setImageURL(imageURL);
            imageDAO.saveAndFlush(image);
        }
    }

    @Override
    @Transactional
    public List<String> getImageURLByItemID(String itemID) {
        return imageDAO.getImageURLByItemID(itemID);
    }
}
