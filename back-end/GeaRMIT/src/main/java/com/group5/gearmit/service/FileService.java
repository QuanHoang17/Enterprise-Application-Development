package com.group5.gearmit.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface FileService {
    List<String> storeImageFile(MultipartFile[] file, String savedName);
}
