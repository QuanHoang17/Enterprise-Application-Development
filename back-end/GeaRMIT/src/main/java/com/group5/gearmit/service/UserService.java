package com.group5.gearmit.service;

import com.group5.gearmit.model.Users;

import java.util.Map;

public interface UserService {
    boolean checkName(String name);
    boolean checkEmail(String name);
    String loginUser(Map<String, String> userInfo);
    String addUser(Map<String, String> userInfo);
}
