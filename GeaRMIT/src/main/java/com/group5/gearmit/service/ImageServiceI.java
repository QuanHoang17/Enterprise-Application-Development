package com.group5.gearmit.service;

import com.group5.gearmit.dao.ImageDAO;
import com.group5.gearmit.dto.ImageDTO;
import com.group5.gearmit.entity.Image;
import com.group5.gearmit.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ImageServiceI implements ImageService {

    @Autowired
    private FileService fileService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ImageDAO imageDAO;

    @Override
    @Transactional
    public Map<String, String> storeItemImage(MultipartFile uploadFiles, Map<Object, Object> productInfo) {
        Map<String, String> response = new HashMap<>();
        Product product = productService.getProductObjectByID((String)productInfo.get("productID"));
        // Check File Type
        boolean correctFileType = true;
        if (!fileService.checkFileType(uploadFiles, "image")) {
            response.put("fileType", "invalid");
            correctFileType = false;
        } else {
            response.put("fileType", "valid");
        }
        
        // Check if product exist
        if (product == null) {
            response.put("product", "not_found");
        } else {
            response.put("product", "exsited");
        }

        // Check if file already exist
        boolean fileExisted = fileService.checkFileExist(uploadFiles, (String) productInfo.get("name"));
        if (fileExisted) {
            response.put("file", "existed");
        } else {
            response.put("file", "available");
        }

        if (product == null || fileExisted || !correctFileType) {
            response.put("status", "failed");
            return response;
        }

        String fileName = fileService.storeFile(uploadFiles, (String) productInfo.get("name"));
        Image image = new Image();
        image.setProduct(product);
        image.setName(fileName);
        imageDAO.save(image);
        response.put("status", "success");
        return response;
    }

    @Override
    @Transactional
    public void deleteImageByProductID(String productID) {
        List<ImageDTO> imageList = imageDAO.getImageByProductId(productID);
        for (ImageDTO image:imageList) {
            fileService.deleteFile(image.getName());
            imageDAO.deleteImageByID(image.getId());
        }
    }

    @Override
    @Transactional
    public List<ImageDTO> getAllImage() {
        return imageDAO.getAllImage();
    }

    @Override
    @Transactional
    public List<ImageDTO> getImageByProductID(String productID) {
        return imageDAO.getImageByProductId(productID);
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
