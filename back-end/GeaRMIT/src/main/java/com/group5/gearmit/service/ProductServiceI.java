package com.group5.gearmit.service;

import com.group5.gearmit.dao.ProductColorDAO;
import com.group5.gearmit.dao.ProductDAO;
import com.group5.gearmit.dto.ProductColorDTO;
import com.group5.gearmit.dto.ImageDTO;
import com.group5.gearmit.dto.ProductDTO;
import com.group5.gearmit.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;

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
    private CategoryService categoryService;

    @Autowired
    private BrandService brandService;

    @Autowired
    private ColorService colorService;

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
    public Map<String, String> addProduct(Map<Object, Object> productJSON) {
        Map<String, String> response = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        List<String> colorNameList = (ArrayList<String>) productJSON.get("color");

        // Check category
        Category category = categoryService.getCategoryById((String) productJSON.get("categoryId"));
        if (category == null) {
            response.put("category", "not found");
        } else {
            response.put("category", "existed");
        }

        // Check brand
        Brand brand = brandService.getBrandByID((String) productJSON.get("brandId"));
        if (brand == null) {
            response.put("brand", "not found");
        } else {
            response.put("brand", "existed");
        }

        // Check product existed
        Product product = productDAO.getOneProductByName((String) productJSON.get("name"));
        if (product != null) {
            response.put("product", "existed");
        } else {
            response.put("product", "available");
        }

        // Check color existed
        List<Color> colorList = new ArrayList<>();
        boolean colorNotFound = false;
        for (String colorName:colorNameList) {
            Color color = colorService.getColorByName(colorName);
            if (color == null) {
                response.put("color", "Not found");
                colorNotFound = true;
                break;
            } else {
                response.put("color", "existed");
                colorList.add(color);
            }
        }

        if (brand == null || category == null || product != null || colorNotFound) {
            response.put("status", "failed");
            return response;
        }

        // Add product
        product = new Product();
        product.setName((String) productJSON.get("name"));
        try {
            product.setIssueDate((new SimpleDateFormat("dd-MM-yyyy")).parse((String) productJSON.get("issueDate")));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        product.setPrice(Long.valueOf((Integer) productJSON.get("price")));
        product.setQuantity(Long.valueOf((Integer) productJSON.get("quantity")));
        product.setDescription((String) productJSON.get("description"));
        product.setBrand(brand);
        product.setCategory(category);
        product = productDAO.save(product);

        // Map color and Product
        for (Color color:colorList) {
            ProductColor productColor = new ProductColor();
            ProductColor.ProductColorPK productColorPK = new ProductColor.ProductColorPK();
            productColorPK.setProduct(product);
            productColorPK.setColor(color);
            productColor.setProductColorPK(productColorPK);
            productColorDAO.save(productColor);
        }

        response.put("status", "success");
        return response;
    }

    @Override
    @Transactional
    public Map<String, String> deleteProduct(String productID) {
        Map<String, String> response = new HashMap<>();
        if (productDAO.getOneProductByID(productID) == null) {
            response.put("product", "not existed");
            response.put("status", "failed");
            return response;
        }
        imageService.deleteImageByProductID(productID);
        productColorDAO.deleteProductColorByProductID(productID);
        productDAO.deleteProductById(productID);
        response.put("status", "success");
        return response;
    }

    @Override
    @Transactional
    public Product getProductObjectByID(String productID) {
        return productDAO.getOneProductByID(productID);
    };
}
