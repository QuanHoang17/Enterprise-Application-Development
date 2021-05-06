package com.group5.gearmit.service;

import com.group5.gearmit.dao.ProductColorDAO;
import com.group5.gearmit.dao.ProductDAO;
import com.group5.gearmit.dto.ProductColorDTO;
import com.group5.gearmit.dto.ImageDTO;
import com.group5.gearmit.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ProductServiceI implements ProductService {
    @Autowired
    private ProductDAO productDAO;

    @Autowired
    private ProductColorDAO productColorDAO;

    @Autowired
    private ImageService imageService;

    @Autowired
    private FileService fileService;

    private List<Map<String, Object>> generateProductList(List<ProductDTO> productDTOList,
                                                          List<ImageDTO> imageDTOList,
                                                          List<ProductColorDTO> productColorDTOList) {
        List<Map<String, Object>> productList = new ArrayList<>();
        for (ProductDTO productDTO : productDTOList) {
            Map<String, Object> productElement = new HashMap<>();
            List<String> imageNameList = new ArrayList<>();
            List<String> colorNameList = new ArrayList<>();

            productElement.put("id", productDTO.getId());
            productElement.put("name", productDTO.getName());
            productElement.put("quantity", productDTO.getQuantity());
            productElement.put("issueDate", productDTO.getIssueDate());
            productElement.put("categoryName", productDTO.getCategoryName());
            productElement.put("brandName", productDTO.getBrandName());
            productElement.put("price", productDTO.getPrice());
            productElement.put("description", productDTO.getDescription());

            for (ImageDTO imageDTO : imageDTOList) {
                if (imageDTO.getProductID().equals(productDTO.getId())) {
                    imageNameList.add(imageDTO.getName());
                }
            }
            productElement.put("imageName", imageNameList);

            for (ProductColorDTO productColorDTO : productColorDTOList) {
                if (productColorDTO.getItemID().equals(productDTO.getId())) {
                    colorNameList.add(productColorDTO.getColorName());
                }
            }
            productElement.put("color", colorNameList);
            productList.add(productElement);
        }
        return productList;
    }

    @Override
    @Transactional
    public List<Map<String, Object>> getAllProduct() {
        List<ProductDTO> productDTOList = productDAO.getAllProduct();
        List<ImageDTO> imageDTOList = imageService.getAllImage();
        List<ProductColorDTO> productColorDTOList = productColorDAO.getAllColor();
        return generateProductList(productDTOList, imageDTOList, productColorDTOList);
    }

    @Override
    @Transactional
    public List<Map<String, Object>> getProductByName(String productName) {
        List<ProductDTO> productDTOList = productDAO.getProductByName(productName);
        List<ImageDTO> imageDTOList = imageService.getImageByProductName(productName);
        List<ProductColorDTO> productColorDTOList = productColorDAO.getColorByProductName(productName);
        return generateProductList(productDTOList, imageDTOList, productColorDTOList);
    }

    @Override
    @Transactional
    public List<Map<String, Object>> getProductByCategoryName(String productCategoryName) {
        List<ProductDTO> productDTOList = productDAO.getProductByCategoryName(productCategoryName);
        List<ImageDTO> imageDTOList = imageService.getImageByProductCategoryName(productCategoryName);
        List<ProductColorDTO> productColorDTOList = productColorDAO.getColorByProductCategoryName(productCategoryName);
        return generateProductList(productDTOList, imageDTOList, productColorDTOList);
    }

    @Override
    @Transactional
    public List<Map<String, Object>> getProductByBrandName(String productBrandName) {
        List<ProductDTO> productDTOList = productDAO.getProductByBrandName(productBrandName);
        List<ImageDTO> imageDTOList = imageService.getImageByProductBrandName(productBrandName);
        List<ProductColorDTO> productColorDTOList = productColorDAO.getColorByProductBrandName(productBrandName);
        return generateProductList(productDTOList, imageDTOList, productColorDTOList);
    }

    @Override
    @Transactional
    public Map<String, String> addProduct(MultipartFile[] images, Map<Object, Object> product) {
        Map<String, String> response = new HashMap<>();
        // Check File Type
        if (!fileService.checkFile(images, "image")) {
            response.put("Error", "file");
            response.put("Error Description", "Not an image file");
            return response;
        }

        // Add product

        // Map color and Product

        // Map image and Product


        response.put("status", "success");
        return response;
    }
}
