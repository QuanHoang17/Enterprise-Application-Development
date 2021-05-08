package com.group5.gearmit.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface FileService {
    List<String> storeFile(MultipartFile[] file, String savedName);
    boolean checkFilesType(MultipartFile[] files, String fileType);
    boolean checkFileType(MultipartFile file, String fileType);
    String storeFile(MultipartFile file, String savedName);
    boolean checkFileExist(MultipartFile file, String savedName);
    void deleteFile(String fileName);
}
