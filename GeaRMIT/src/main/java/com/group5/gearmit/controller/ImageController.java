package com.group5.gearmit.controller;

import com.group5.gearmit.dto.ImageDTO;
import com.group5.gearmit.service.FileService;
import com.group5.gearmit.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private FileService fileService;

    //    consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE}
    @PostMapping(value = "/api/image")
    public Map<String, String> uploadFiles(@RequestPart("file") MultipartFile imageFile,
                                           @RequestPart("info") Map<Object, Object> productInfo) {
        return imageService.storeItemImage(imageFile, productInfo);
    }

    @GetMapping(value = "/api/image/info")
    public List<ImageDTO> getAllImageInfo() {
        return imageService.getAllImage();
    }

    @GetMapping(value = "/api/image/{filename}", produces = "image/*")
    public InputStreamResource getImage(@PathVariable("filename") String filename) {
        return new InputStreamResource(fileService.downloadFileByName(filename));
    }
}
