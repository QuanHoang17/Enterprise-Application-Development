package com.group5.gearmit.controller;

import com.group5.gearmit.dto.ImageDTO;
import com.group5.gearmit.service.FileService;
import com.group5.gearmit.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class ImageController {
    @Autowired
    FileService fileService;

    @Autowired
    ImageService imageService;
//    consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE}
    @PostMapping(value = "/api/image")
    public Map<String, String> uploadFiles(@RequestPart("file") MultipartFile imageFile,
                                           @RequestPart("info") Map<Object, Object> productInfo) {
        return imageService.storeItemImage(imageFile, productInfo);
    }

    @GetMapping(value = "/api/image/info")
    public List<ImageDTO> getAllImage() {
        return imageService.getAllImage();
    }

    @GetMapping(value = "/api/image/{filename}", produces = "image/*")
    public FileSystemResource getImage(@PathVariable("filename") String filename) {
        FileSystemResource fileSystemResource = null;
        try {
            Path imagePath = Paths.get("./images");
            Files.createDirectories(imagePath);
            fileSystemResource = new FileSystemResource("images/".concat(filename));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileSystemResource;
    }
}
