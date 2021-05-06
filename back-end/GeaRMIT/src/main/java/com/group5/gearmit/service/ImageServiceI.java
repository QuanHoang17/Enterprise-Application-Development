package com.group5.gearmit.service;

import com.group5.gearmit.dao.ImageDAO;
import com.group5.gearmit.dto.ImageDTO;
import com.group5.gearmit.entity.Image;
import com.group5.gearmit.entity.Product;
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
    public void storeItemImages(MultipartFile[] uploadFiles, Product product) {
        String basedFileName = product.getId() + "_" + product.getName();
        List<String> imageURLList = fileService.storeFile(uploadFiles, basedFileName);
        for(String imageURL:imageURLList) {
            Image image = new Image();
            image.setProduct(product);
            image.setName(imageURL);
            imageDAO.save(image);
        }
    }

    @Override
    @Transactional
    public List<String> getImageURLByItemID(String itemID) {
        return imageDAO.getImageURLByItemID(itemID);
    }

    @Override
    @Transactional
    public List<ImageDTO> getAllImage() {
        return imageDAO.getAllImage();
    }

    @Override
    @Transactional
    public List<ImageDTO> getImageByProductName(String productName) {
        return imageDAO.getImageByProductName(productName);
    }

    @Override
    @Transactional
    public List<ImageDTO> getImageByProductCategoryName(String productCategoryName) {
        return imageDAO.getImageByProductCategoryName(productCategoryName);
    }

    @Override
    @Transactional
    public List<ImageDTO> getImageByProductBrandName(String productBrandName) {
        return imageDAO.getImageByProductBrandName(productBrandName);
    }
}
