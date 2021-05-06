package com.group5.gearmit.controller;

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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class FileController {
    @Autowired
    FileService fileService;

    @Autowired
    ImageService imageService;

    // Test controller for file upload
//    @PostMapping(value = "/api/upload/images")
//    public Map<String, String> uploadFiles(@RequestParam("files") MultipartFile[] files,
//                                           @RequestParam("name") String name,
//                                           @RequestParam("id") String id) {
//        Map<String, String> response = new HashMap<>();
//        imageService.storeItemImages(files, id, name);
//        response.put("status", "success");
//        return response;
//    }

    @GetMapping(value = "/api/images/{filename}", produces = "image/*")
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

    @GetMapping(value = "/api/images/id/{id}", produces = "image/*")
    public List<String> getImages(@PathVariable("id") String id) {
        System.out.println(imageService.getImageURLByItemID(id).toString());
        return null;
    }

}
