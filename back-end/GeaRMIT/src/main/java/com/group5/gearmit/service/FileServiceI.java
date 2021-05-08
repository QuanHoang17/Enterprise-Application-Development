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
    private String getFileExtension(MultipartFile file) {
        return file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
    }

    @Override
    public List<String> storeFiles(MultipartFile[] files, String savedName) {
        List<String> fileNameList = new ArrayList<>();
        try {
            Path imagePath = Paths.get("./images");
            if (!Files.exists(imagePath)) {
                Files.createDirectories(imagePath);
            }

            // Create new file with format id_name_index.extension
            for (int i = 0; i < files.length; i++) {
                MultipartFile file = files[i];
                String fileExtension = getFileExtension(file);
                String fileName = savedName + "_" + Integer.toString(i) + "." + fileExtension;
                Path filePath = Paths.get("./images/" + fileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                fileNameList.add(fileName);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileNameList;
    }

    @Override
    public String storeFile(MultipartFile file, String savedName) {
        String fileName = "";
        try {
            Path imagePath = Paths.get("./images");
            if (!Files.exists(imagePath)) {
                Files.createDirectories(imagePath);
            }
            String fileExtension = getFileExtension(file);
            fileName = savedName + "." + fileExtension;
            imagePath = Paths.get("./images/" + fileName);
            Files.copy(file.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileName;
    }

    @Override
    public void deleteFile(String fileName) {
        try {
            Path filePath = Paths.get("./images/" + fileName);
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean checkFilesType(MultipartFile[] files, String fileType) {
        for (int i = 0; i < files.length; i++) {
            String contentType = files[i].getContentType().split("/")[0];
            if (!contentType.equals(fileType)) {
                return false;
            }
        }
        return true;
    }

    @Override
    public boolean checkFileType(MultipartFile file, String fileType) {
        String contentType = file.getContentType().split("/")[0];
        if (!contentType.equals(fileType)) {
            return false;
        }
        return true;
    }

    @Override
    public boolean checkFileExist(MultipartFile file, String savedName) {
        String fileExtension = getFileExtension(file);
        String fileName = savedName + "." + fileExtension;
        Path path = Paths.get("./images/" + fileName);
        if (Files.exists(path)) {
            return true;
        }
        return false;
    }
}
