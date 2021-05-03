package com.group5.gearmit.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileServiceI implements FileService {
    @Override
    public List<String> storeImageFile(MultipartFile[] files, String savedName) {
        List<String> requestPath = new ArrayList<>();
        try {
            Path imagePath = Paths.get("./images");
            if (!Files.exists(imagePath)) {
                Files.createDirectories(imagePath);
            }

            // Create new file with format id_name_index.extension
            for (int i = 0; i < files.length; i++) {
                MultipartFile file = files[i];
                String fileExtension = file.getContentType().split("/")[1];
                if (!fileExtension.equals("jpeg") && !fileExtension.equals("png")) {
                    fileExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
                }
                String requestURL = "/images/" + savedName + "_" + Integer.toString(i) + "." + fileExtension;
                Path filePath = Paths.get("./images/" + savedName + "_" + Integer.toString(i) + "." + fileExtension);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                requestPath.add(requestURL);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return requestPath;
    }
}
