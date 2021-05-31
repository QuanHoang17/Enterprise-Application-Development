package com.group5.gearmit.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.util.List;

public interface FileService {

    List<String> storeFiles(MultipartFile[] file, String savedName);

    boolean checkFilesType(MultipartFile[] files, String fileType);

    String storeFile(MultipartFile file, String savedName);

    boolean checkFileType(MultipartFile file, String fileType);

    boolean checkFileExist(MultipartFile file, String savedName);

    void deleteFile(String fileName);

    InputStream downloadFileByName(String name);
}
